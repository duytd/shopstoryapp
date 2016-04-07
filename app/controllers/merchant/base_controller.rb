class Merchant::BaseController < ApplicationController
  layout "merchant/layouts/admin"
  include Merchant::BaseHelper
  include Merchant::SubscriptionsHelper

  before_action :authenticate_merchant!
  before_action :authenticate_subscription!, except: :account

  private
  def authenticate_merchant!
    unless merchant_signed_in? && merchant_authenticated?
      redirect_to new_merchant_session_url domain: Settings.app.domain, subdomain: nil
    end
  end

  def authenticate_subscription!
    unless current_merchant.has_subscription? || !trial_expired_for?(current_merchant)
      redirect_to merchant_account_path
    end
  end
end
