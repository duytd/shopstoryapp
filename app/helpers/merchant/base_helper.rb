module Merchant::BaseHelper
  def current_ability
    @current_ability ||= Ability.new current_merchant
  end

  def current_shop
    subdomain = Apartment::Tenant.current
    @current_shop ||= Shop.find_by_subdomain subdomain
  end

  def merchant_authenticated?
    current_shop.subdomain == Apartment::Tenant.current
  end

  def shop_url
    if current_shop.domain.present?
      full_http_url current_shop.domain
    else
      customer_root_url subdomain: current_shop.subdomain
    end
  end

  def paginating object, props
    props.merge({
      page: object.current_page,
      total_page: object.num_pages,
      total: object.total_count
    })
  end

  private
  def full_http_url url
    unless url[/\Ahttp:\/\//] || url[/\Ahttps:\/\//]
      return "http://#{url}"
    end
    url
  end
end
