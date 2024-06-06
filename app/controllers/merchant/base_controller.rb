class Merchant::BaseController < ApplicationController
  layout "merchant/layouts/admin"
  include Merchant::BaseHelper
  include Merchant::SubscriptionsHelper
  include BreadcrumbHelper

  before_action :authenticate_merchant!
  before_action :authenticate_subscription!, except: :account

  protected
  def self.add_breadcrumb name, path = nil, options={}
    before_action(options) do |controller|
      controller.send :add_breadcrumb, name, Rails.application.routes.url_helpers.send(path)
    end
  end

  private

  def authenticate_merchant!
    unless merchant_signed_in? && merchant_authenticated?
      redirect_to new_merchant_session_url domain: Settings.app.domain, subdomain: nil
    end
  end

  def authenticate_subscription!
    unless current_merchant.has_subscription? || free_plan?(current_merchant)
      redirect_to merchant_account_path
    end
  end
end
