class Merchant::ShopsController < Merchant::BaseController
  include Merchant::ShopsHelper

  load_and_authorize_resource

  before_action :load_timezones, :load_currencies,
    :load_countries, only: :edit

  def edit
    @props = {
      shop: @shop,
      method: :put,
      time_zones: @time_zones,
      countries: @countries,
      currencies: @currencies,
      url: merchant_shop_path(@shop),
      config: {
        default_currency: Settings.shop.default_currency,
        default_timezone: Settings.shop.default_timezone,
        default_country: Settings.shop.default_country
      }
    }
  end

  def update
    if @shop.update shop_params
      render json: @shop, status: :ok
    else
      render json: @shop.errors, status: :unprocessable_entity
    end
  end

  private
  def shop_params
    permitted = Shop.globalize_attribute_names + [:name, :email, :legal_name, :phone, :city, :country, :zip_code, :time_zone, :metric_system,
      :weight_unit, :domain, :currency, :facebook_url, :instagram_url, :pinterest_url, :naver, :daum, :kakao, :yellow, :ceo, :business_number, :service_phone,
      :online_retail_number, :privacy_manager, :privacy_email]
    params.require(:shop).permit *permitted
  end

  def load_timezones
    @time_zones = all_timezones
  end

  def load_currencies
    @currencies = all_currencies
  end

  def load_countries
    @countries = all_countries
  end
end
