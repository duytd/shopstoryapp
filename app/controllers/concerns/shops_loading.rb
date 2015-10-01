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
    subdomain = Apartment::Tenant.current

    @globalVars = {
      shop_name: Shop.current(subdomain).name,
      logged_in: customer_signed_in?
    }
  end

  def current_shop
    subdomain = Apartment::Tenant.current
    Shop.current subdomain
  end
end
