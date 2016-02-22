class Customer::OrdersController < Customer::BaseController
  authorize_resource
  include Merchant::ShopsHelper

  before_action :validate_order!

  def new
    @props = {
      order: current_order,
      globalVars: @globalVars,
      countries: all_countries,
      default_country: Settings.shop.default_country,
      payment_methods: current_shop.payment_methods
    }
  end

  def update
    current_order.customer = current_customer

    if current_order.update order_params
      unless current_order.last_step?
        if current_order.current_step == "billing"
          current_order.change_status "pending"
          current_order.payment.update_attributes amount: order.total
        end

        current_order.next_step
        session[:order_step] = current_order.current_step
      else
        session[:order_type] = "product"
      end

      render json: current_order, status: :ok
    else
      render json: current_order.errors, status: :unprocessable_entity
    end
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
      :address2, :city, :state, :country, :zip_code, :phone_number, :fax, :order_id]

    permitted_payment_attributes = [:id, :payment_method_id, :submethod, :order_id]

    params.require(:order).permit shipping_address_attributes: permitted_address_attributes,
      billing_address_attributes: permitted_address_attributes,
      payment_attributes: permitted_payment_attributes
  end
end
