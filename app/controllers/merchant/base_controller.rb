class Merchant::BaseController < ApplicationController
  layout "merchant/layouts/admin"

  before_action :authenticate_merchant!, :load_current

  def current_ability
    @current_ability ||= Ability.new current_merchant
  end

  def load_current
    @current_shop = current_merchant.shop
    @current_theme = @current_shop.theme
    @current_theme_editor = @current_shop.theme_editors.with_theme @current_theme
  end

  private
  def authenticate_merchant!
    unless merchant_signed_in? && current_merchant.shop.subdomain == Apartment::Tenant.current
      render text: "Access Denied"
    end
  end
end
