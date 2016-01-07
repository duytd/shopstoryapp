module Customer::BaseHelper
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

    @current_order.current_step = session[:order_step]
    @current_order
  end

  def initialize_order
    if customer_signed_in?
      current_customer.orders.where(ip_address: ip_address, status: 0).first_or_create
    else
      order = Order.create ip_address: ip_address
    end

    cookies[:cart] = {value: order.token, http_only: true,
                                expires: 3.days.from_now}
    order
  end

  def ip_address
    request.remote_ip
  end
end
