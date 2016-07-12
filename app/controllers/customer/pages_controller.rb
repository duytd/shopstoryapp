class Customer::PagesController < Customer::BaseController
  before_action :authenticate_order!, only: :success
  include PaymentHelper

  def home
    @products = Product.latest.featured.map{|p| present(p)}
    @banner = Banner.first ? present(Banner.first) : nil

    @props = {
      globalVars: @globalVars,
      products: @products,
      banner: @banner
    }
  end

  def checkout
  end

  def success
    transaction_info = get_transaction_info @order

    @props = {
      globalVars: @globalVars,
      order_info: {
        order_number: @order.id,
        transaction_info: transaction_info,
        support_email: current_shop.email
      }
    }
  end

  def cart
    @props = {
      globalVars: @globalVars
    }
  end

  private
  def authenticate_order!
    @order = current_order

    unless @order && @order.payment
      redirect_to customer_root_path
    else
      clear_order
      empty_cart
    end
  end
end
