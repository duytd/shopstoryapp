class Merchant::PagesController < Merchant::BaseController
  before_action :load_assets, only: :editor
  before_action :load_templates, only: :editor

  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:editor]}

  def dashboard
    check_setup_step

    @today_sales = ProductOrder.get_sale "today"
    @total_products = Product.count
    @total_customers = Customer.count

    @today_revenue = ProductOrder.get_revenue "today"
    @last_7_days_revenue = ProductOrder.get_revenue "last_7_days"
    @last_30_days_revenue = ProductOrder.get_revenue "last_30_days"
    @weeky_chart_data = ProductOrder.weekly_data
    @recent_orders = ProductOrder.latest.limit Settings.order.recent_count

    @props = {
      total_revenue: @total_revenue,
      today_sales: @today_sales,
      total_products: @total_products,
      total_customers: @total_customers,
      today_revenue: @today_revenue,
      last_7_days_revenue: @last_7_days_revenue,
      last_30_days_revenue: @last_30_days_revenue,
      recent_orders: @recent_orders.map{|o| present(o)},
      weeky_chart_data: @weeky_chart_data
    }
  end

  def credentials
    @props = {
      credentials: {
        api_key: current_shop.api_key,
      }
    }
  end

  def webmaster
    @props = {
      shop: current_shop
    }
  end

  def account
    @props = {
      user: current_merchant,
      subscription: current_merchant.subscription,
      remaining_trial: remaining_products(current_merchant),
      plans: Plan.all,
      stripe_key: Rails.configuration.stripe[:publishable_key]
    }
  end

  def editor
    @asset = Asset::Stylesheet.filter_by_theme(current_shop.theme).first

    @props = {
      data: @asset,
      url: merchant_asset_path(@asset),
      reset_url: edit_merchant_asset_path(@asset, reset: true),
      javascripts: @javascripts,
      stylesheets: @stylesheets,
      locales: @locales,
      templates: @templates
    }
  end

  private
  def check_setup_step
    unless current_merchant.done?
      redirect_to merchant_after_signup_path
    end
  end

  def load_assets
    @javascripts = Asset::Javascript.filter_by_theme(current_shop.theme).as_json({only: [:id, :name]})
    @stylesheets = Asset::Stylesheet.filter_by_theme(current_shop.theme).as_json({only: [:id, :name]})
    @locales = Asset::Locale.filter_by_theme(current_shop.theme).as_json({only: [:id, :name]})
  end

  def load_templates
    @templates = Template.filter_by_theme(current_shop.theme).as_json({only: [:id, :name, :directory]}).group_by{|t| t["directory"]}
  end
end
