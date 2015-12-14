class Customer::OrdersController < Customer::BaseController
  authorize_resource
  include Merchant::ShopsHelper

  def new
    @props = {
      order: current_order,
      globalVars: @globalVars,
      countries: all_countries,
      default_country: Settings.shop.default_country
    }
  end

  def update
    current_order.customer = current_customer

    if current_order.update order_params
      unless current_order.last_step?
        current_order.next_step
        session[:order_step] = current_order.current_step
      else
        current_order.change_status "pending"
      end

      render json: current_order, status: :ok
    else
      render json: current_order.errors, status: :unprocessable_entity
    end
  end

  private
  def order_params
    permitted_address_attributes =  [:id, :email, :first_name, :last_name, :company, :address1,
      :address2, :city, :state, :country, :zip_code, :phone_number, :fax, :order_id]

    params.require(:order).permit shipping_address_attributes: permitted_address_attributes,
      billing_address_attributes: permitted_address_attributes
  end
end
