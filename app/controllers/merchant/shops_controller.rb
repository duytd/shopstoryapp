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
      redirect_url: merchant_root_path,
      config: {
        default_currency: Settings.shop.default_currency,
        default_timezone: Settings.shop.default_timezone,
        default_country: Settings.shop.default_country
      }
    }
  end

  def update
    if @shop.update shop_params
      render json: {data: @shop, status: :success}
    else
      render json: {data: @shop.errors, status: :unprocessed_entity}
    end
  end

  private
  def shop_params
    permitted = Shop.globalize_attribute_names + [:name, :email, :legal_name, :phone,
      :city, :country, :zip_code, :time_zone, :metric_system, :weight_unit,
      :currency, :facebook_url, :instagram_url, :pinterest_url]
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
