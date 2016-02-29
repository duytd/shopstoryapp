class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale, :authenticate

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def login_client
  end

  def default_url_options options = {}
    {locale: I18n.locale}.merge options
  end

  def account_url resource
    case resource.class.name
    when "Admin"
      admin_root_url
    when "Merchant"
      merchant_root_url subdomain: resource.shop.subdomain
    when "Customer"
      customer_url
    else
      root_url
    end
  end

  def after_sign_in_path_for resource
    stored_location_for(resource) || account_url(resource)
  end

  protected
  def authenticate
    if Rails.env.staging?
       authenticate_or_request_with_http_basic do |username, password|
         username == Settings.tester.name && password == Settings.tester.password
       end
    end
  end

  def customer_url
    if request.domain == Settings.app.domain
      customer_root_url subdomain: Apartment::Tenant.current
    else
      customer_root_url
    end
  end
end
