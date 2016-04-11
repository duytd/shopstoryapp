module Merchant::BaseHelper
  def current_ability
    @current_ability ||= Ability.new current_merchant
  end

  def current_shop
    subdomain = Apartment::Tenant.current
    @current_shop ||= Shop.find_by_subdomain subdomain
  end

  def current_asset
    session[:asset_id] || current_shop.assets.with_theme(current_shop.theme_id).id
  end

  def merchant_authenticated?
    current_shop.domain == request.host || current_shop.subdomain == Apartment::Tenant.current
  end

  def current_subdomain
    session[:subdomain] || current_shop.subdomain
  end

  def paginating object, props
    props.merge({page: object.current_page, total_page: object.num_pages})
  end
end
