class Merchant::BaseController < ApplicationController
  layout "merchant/layouts/admin"
  include Merchant::BaseHelper

  before_action :authenticate_merchant!

  private
  def authenticate_merchant!
    unless merchant_signed_in? && current_shop.subdomain == Apartment::Tenant.current
      render text: "Access Denied"
    end
  end
end
