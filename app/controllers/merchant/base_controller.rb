class Merchant::BaseController < ApplicationController
  layout "merchant/layouts/admin"

  before_action :authenticate_merchant!

  def current_ability
    @current_ability ||= Ability.new current_merchant
  end

  private
  def authenticate_merchant!
    unless merchant_signed_in? && current_merchant.shop.subdomain == Apartment::Tenant.current
      render text: "Access Denied"
    end
  end
end
