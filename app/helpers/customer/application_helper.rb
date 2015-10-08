module Customer::ApplicationHelper
  def current_shop
    subdomain = Apartment::Tenant.current
    @current_shop ||= Shop.find_by_subdomain subdomain
  end

  def current_theme
    @current_theme ||= current_shop.theme
  end

  def current_order
    if cart_token = cookies[:cart]
      @current_order ||= Order.find_by_token(cart_token) || initialize_order
    else
      @current_order ||= initialize_order
    end
  end

  def initialize_order
    order = Order.create ip_address: ip_address
    cookies[:cart] = {value: order.token, http_only: true, 
                                expires: 3.days.from_now}
    order
  end

  def ip_address
    request.remote_ip
  end
end
