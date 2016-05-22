require "rubygems"
require "browser"

module ShopsLoading
  extend ActiveSupport::Concern
  include Customer::BaseHelper

  included do
    helper Customer::BaseHelper
    layout "customer/layouts/application"
    before_action :load_global_variables, except: [:create, :update, :destroy]
  end

  private
  def load_global_variables
    @globalVars = {
      lang: I18n.locale,
      shop_name: current_shop.name,
      logo: current_shop.logo.thumb.url,
      business_information: {
        legal_name: current_shop.legal_name,
        address: current_shop.street_ko,
        business_number: current_shop.business_number,
        ceo: current_shop.ceo,
        email: current_shop.email,
        service_phone: current_shop.service_phone,
        online_retail_number: current_shop.online_retail_number,
        privacy_manager: current_shop.privacy_manager,
        privacy_email: current_shop.privacy_email
      },
      current_customer: current_customer ? Customer::CustomerPresenter.new(current_customer) : nil,
      currency: current_shop.currency,
      cart: current_order.order_products.includes(:variation).map{|op| Customer::OrderProductPresenter.new(op)},
      mobile: browser.device.mobile?,
      menu: {
        main_menu: Menu.with_position(:main),
        footer_menu: Menu.with_position(:footer),
        top_left: Menu.with_position(:top_left),
        top_right: Menu.with_position(:top_right)
      }
    }
  end
end
