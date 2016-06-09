module Customer::BaseHelper
  def paginating object, props
    props.merge({
      page: object.current_page,
      total_page: object.num_pages,
      total: object.total_count
    })
  end

  def render_meta_tags object, default_options
    unless object.seo_tag.nil?
      set_meta_tags title: object.seo_tag.title,
        description: object.seo_tag.meta_description,
        keywords: object.seo_tag.meta_keywords
    else
      set_meta_tags title: default_options[:title],
        description: html_to_text(default_options[:meta_description]),
        keywords: default_options[:meta_keywords]
    end
  end

  def html_to_text html
    unless html.present?
      return nil
    end

    strip_html_tags(html).truncate(255).gsub("\r", " ").gsub("\n", " ")
  end

  def current_shop
    subdomain = Apartment::Tenant.current
    @current_shop ||= Shop.find_by_subdomain subdomain
  end

  def current_theme
    @current_theme ||= current_shop.theme
  end

  def current_currency
    session[:currency] ||= current_shop.currency
    @current_currency ||= session[:currency]
  end

  def current_order
    unless cookies.signed[:order_token].blank?
      @current_order ||= ProductOrder.find_by_token(cookies.signed[:order_token]) || initialize_order
    else
      @current_order ||= initialize_order
    end

    @current_order.current_step = session[:order_step]
    @current_order
  end

  def clear_order
    [:order_step, :order_type].each{ |k| session.delete k }
    current_order.update_attributes token: nil
  end

  def empty_cart
    @globalVars[:cart] = []
  end

  def initialize_order
    if customer_signed_in?
      current_customer.product_orders.where(status: Order.statuses[:incompleted]).first_or_initialize
    else
      ProductOrder.new status: Order.statuses[:incompleted], currency: current_shop.currency.upcase
    end
  end

  def present object, options={}
    klass = options[:presenter_klass] || "Customer::#{options[:sti] ? object.class.superclass : object.class}Presenter".constantize
    presenter = klass.new object, options
  end

  private
  def ip_address
    request.remote_ip
  end

  def strip_html_tags string
    ActionView::Base.full_sanitizer.sanitize string
  end
end
