module ThemesLoading 
  extend ActiveSupport::Concern

  included do
    layout "customer/layouts/application"
    before_action :load_theme, :load_global_variables
  end

  private
  def load_theme
    @current_theme = current_theme
  end

  def load_global_variables
    subdomain = Apartment::Tenant.current

    @globalVars = {
      shop_name: Shop.current(subdomain).name,
      logged_in: customer_signed_in?
    }
  end

  def current_theme
    subdomain = Apartment::Tenant.current
    Theme.current subdomain
  end
end
