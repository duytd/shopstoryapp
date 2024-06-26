class Customer::OrdersController < Customer::BaseController
  authorize_resource
  include CollectionsHelper

  before_action :authenticate_customer!, only: [:verify_coupon, :remove_coupon]
  before_action :validate_order!, only: [:new, :update, :verify_coupon, :remove_coupon]
  before_action :authenticate_order, only: [:update, :verify_coupon, :remove_coupon]

  def new
    load_global_variables
    publishable_key = load_stripe_key

    @props = {
      order: present(current_order),
      globalVars: @globalVars,
      countries: all_countries,
      default_country: Settings.shop.default_country,
      payment_methods: PaymentMethod.active.map{|e| present(e, sti: true)},
      publishable_key: publishable_key
    }

    session[:customer_return_to] = new_customer_order_path
  end

  def show
    load_global_variables
    @order = current_customer.orders.find params[:id]

    @props = {
      globalVars: @globalVars,
      order: present(@order),
    }
  end

  def update
    current_order.customer = current_customer

    if current_order.update order_params
      unless current_order.last_step?
        session[:order_step] = current_order.next_step
      else
        current_order.pending!
        session[:order_type] = "product"
      end

      render json: present(current_order), status: :ok
    else
      render json: current_order.errors, status: :unprocessable_entity
    end
  end

  def verify_coupon
    outcome = Discounts::Verify.run(code: params[:code], customer: current_customer)

    if outcome.valid?
      current_order.add_discount discount, current_customer
    else
      render json: {message: outcome.errors.full_messages.to_sentence}, status: :unprocessable_entity
    end
  end

  def remove_coupon
    current_order.remove_discount
    render json: present(current_order), status: :ok
  end

  private

  def validate_order!
    if current_order.order_products.count == 0
      flash[:danger] = t "customer.flash.cart_empty"
      redirect_to customer_root_path
    end
  end

  def order_params
    permitted_address_attributes =  [:id, :email, :first_name, :last_name, :company, :address1,
      :address2, :city, :state, :country, :zip_code, :phone_number, :alternative_phone, :delivery_message, :fax, :order_id]

    permitted_payment_attributes = [:id, :payment_method_id, :submethod, :order_id]

    params.require(:order).permit shipping_address_attributes: permitted_address_attributes,
      billing_address_attributes: permitted_address_attributes,
      payment_attributes: permitted_payment_attributes
  end

  def authenticate_order
    head :unauthorized unless current_order.abandoned?
  end

  def load_stripe_key
    PaymentMethod.stripe.load_option("publishable_key")
  end
end
