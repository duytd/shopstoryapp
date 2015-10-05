module ShopsLoading 
  extend ActiveSupport::Concern

  included do
    layout "customer/layouts/application"
    before_action :load_shop, :load_global_variables
  end

  private
  def load_shop
    @current_shop = current_shop
    @current_theme = @current_shop.theme
  end

  def load_global_variables
    @globalVars = {
      shop_name: @current_shop.name,
      logged_in: customer_signed_in?,
      currency: @current_shop.currency
    }
  end

  def current_shop
    subdomain = Apartment::Tenant.current
    Shop.current subdomain
  end
end
