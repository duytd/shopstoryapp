module ShopsLoading
  extend ActiveSupport::Concern
  include Customer::BaseHelper

  included do
    helper Customer::BaseHelper
    layout "customer/layouts/application"
    before_action :load_global_variables
  end

  private
  def load_global_variables
    @globalVars = {
      lang: I18n.locale,
      shop_name: current_shop.name,
      current_customer: current_customer,
      currency: current_shop.currency,
      cart: current_order.order_products
    }
  end
end
