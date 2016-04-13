class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale, :authenticate

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options options = {}
    {locale: I18n.locale}.merge options
  end

  def account_url resource
    case resource.class.name
    when "Admin"
      admin_root_url
    when "Merchant"
      merchant_url resource.shop.subdomain
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
    if params[:session_id].present?
      session[:session_id] = params[:session_id]
    end
  end

  def customer_url
    if request.domain == Settings.app.domain
      customer_root_url subdomain: Apartment::Tenant.current
    else
      customer_root_url
    end
  end

  def merchant_url subdomain
    merchant_root_url subdomain: subdomain
  end
end
