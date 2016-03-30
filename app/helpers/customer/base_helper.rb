module Customer::BaseHelper
  def current_shop
    subdomain = Apartment::Tenant.current
    @current_shop ||= Shop.find_by_subdomain subdomain
  end

  def current_theme
    @current_theme ||= current_shop.theme
  end

  def current_order
    if cookies[:po]
      @current_order ||= ProductOrder.find_by_token(cookies[:po]) || initialize_order
    else
      @current_order ||= initialize_order
    end

    @current_order.current_step = session[:order_step]
    @current_order
  end

  def clear_order
    [:order_step, :order_type].each{ |k| session.delete k }
    [:to, :po].each{ |k| cookies.delete k }
  end

  def initialize_order
    if customer_signed_in?
      order = current_customer.product_orders.where(ip_address: ip_address, status: Order.statuses[:incompleted]).first_or_create
    else
      order = ProductOrder.find_or_create_by ip_address: ip_address, status: Order.statuses[:incompleted]
    end

    currency = current_shop.currency.upcase
    order.update_currency currency
    session[:currency] = currency

    cookies[:po] = {value: order.token, http_only: true,
                                expires: 3.days.from_now}
    order
  end

  def ip_address
    request.remote_ip
  end
end
