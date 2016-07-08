class Merchant::ShopsController < Merchant::BaseController
  include CollectionsHelper

  load_and_authorize_resource
  before_action :load_timezones, :load_currencies, :load_countries, only: :edit
  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:edit]}

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

  def webmaster
    if request.put?
      if current_shop.update webmaster_params
        render json: current_shop, status: :ok
      else
        render json: current_shop.errors, status: :unprocessable_entity
      end
    else
      @props = {
        shop: current_shop,
        url: webmaster_merchant_shops_path,
        method: "PUT",
        redirect_url: merchant_root_path
      }
    end
  end

  private
  def shop_params
    permitted = Shop.globalize_attribute_names + [:name, :email, :legal_name, :phone, :city, :country, :zip_code, :time_zone, :metric_system,
      :weight_unit, :domain, :currency, :facebook_url, :instagram_url, :pinterest_url, :naver, :daum, :kakao, :yellow, :ceo, :business_number, :service_phone,
      :online_retail_number, :privacy_manager, :privacy_email]
    params.require(:shop).permit *permitted
  end

  def webmaster_params
    params.require(:shop).permit :google_verification_code, :naver_verification_code, :meta_title, :meta_description, :meta_keywords
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
