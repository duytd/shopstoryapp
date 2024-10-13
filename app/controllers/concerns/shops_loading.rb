require "rubygems"
require "browser"

module ShopsLoading
  extend ActiveSupport::Concern
  include Customer::BaseHelper

  included do
    helper Customer::BaseHelper
    layout "customer/layouts/application"
    # before_action :load_global_variables, except: [:create, :update, :destroy]
  end

  private

  def load_global_variables
    load_menus

    @globalVars = {
      lang: I18n.locale,
      shop_name: current_shop.name,
      logo: current_shop.logo.thumb.url,
      business_information: {
        instagram_url: current_shop.instagram_url,
        facebook_url: current_shop.facebook_url,
        pinterest_url: current_shop.pinterest_url,
      },
      current_customer: current_customer ? present(current_customer) : nil,
      currency: current_currency,
      available_currencies: ["KRW", "USD"],
      exchange_rate: current_shop.exchange_rate || 10000,
      order: present(current_order),
      mobile: browser.device.mobile?,
      menu: {
        main: @main_menu ? present(@main_menu) : nil,
        footer: @footer_menu ? present(@footer_menu) : nil
      }
    }
  end

  def load_menus
    menus = Menu.all
    @main_menu = menus.detect{|menu| menu.main?}
    @footer_menu = menus.detect{|menu| menu.footer?}
  end
end
