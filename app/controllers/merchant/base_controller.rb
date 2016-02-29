class Merchant::BaseController < ApplicationController
  layout "merchant/layouts/admin"
  include Merchant::BaseHelper

  before_action :authenticate_merchant!

  private
  def authenticate_merchant!
    unless merchant_signed_in? && merchant_authenticated?
      redirect_to new_merchant_session_url domain: Settings.app.domain
    end
  end
end
