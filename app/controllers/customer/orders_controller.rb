require "rqrcode"
require "stripe_shopstory"

class Customer::OrdersController < Customer::BaseController
  authorize_resource
  include Merchant::ShopsHelper

  before_action :validate_order!, only: [:new, :update]
  before_action :authenticate_order, only: :update

  def show
    @order = Order.find params[:id]
    qrcode = RQRCode::QRCode.new(@order.ticket_code).as_html if @order.ticket_code

    @props = {
      globalVars: @globalVars,
      order: @order,
      qrcode: qrcode
    }
  end

  def new
    stripe_interface = StripeShopstory::StripeInterface.new current_shop

    @props = {
      order: current_order,
      globalVars: @globalVars,
      countries: all_countries,
      default_country: Settings.shop.default_country,
      payment_method_shops: current_shop.payment_method_shops.active.map{|e| Customer::PaymentMethodShopPresenter.new(e)},
      publishable_key: stripe_interface.publishable_key
    }

    session[:customer_return_to] = new_customer_order_path
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
      :address2, :city, :state, :country, :zip_code, :phone_number, :alternative_phone, :delivery_message, :fax, :order_id]

    permitted_payment_attributes = [:id, :payment_method_id, :submethod, :order_id]

    params.require(:order).permit shipping_address_attributes: permitted_address_attributes,
      billing_address_attributes: permitted_address_attributes,
      payment_attributes: permitted_payment_attributes
  end

  def authenticate_order
    unless current_order.incompleted? || current_order.pending?
      head :unauthorized
    end
  end
end
