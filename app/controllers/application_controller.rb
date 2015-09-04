class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options options = {}
    {locale: I18n.locale}.merge options
  end

  def account_url resource
    case resource.type
    when "Admin"
      admin_root_url
    when "Merchant"
      merchant_root_url subdomain: resource.subdomain
    when "Customer"
      root_url subdomain: resource.subdomain
    else
      root_url
    end
  end

  def after_sign_in_path_for resource
    stored_location_for(resource) || account_url(resource)
  end
end
