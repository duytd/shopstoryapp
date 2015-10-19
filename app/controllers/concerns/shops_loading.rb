module ShopsLoading
  extend ActiveSupport::Concern
  include Customer::ApplicationHelper

  included do
    layout "customer/layouts/application"
    before_action :load_global_variables
  end

  private
  def load_global_variables
    @globalVars = {
      shop_name: current_shop.name,
      logged_in: customer_signed_in?,
      currency: current_shop.currency,
      cart: current_order.order_products
    }
  end
end
