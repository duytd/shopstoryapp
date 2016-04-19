class Merchant::PagesController < Merchant::BaseController
  before_action :load_assets, only: :editor
  before_action :load_templates, only: :editor

  def dashboard
  end

  def credentials
    @props = {
      credentials: {
        api_key: current_shop.api_key,
      }
    }
  end

  def account
    @props = {
      user: current_merchant,
      subscription: current_merchant.subscription,
      remaining_trial: remaining_days(current_merchant),
      plans: Plan.all,
      stripe_key: Rails.configuration.stripe[:publishable_key]
    }
  end

  def editor
    @asset = Asset::Stylesheet.first

    @props = {
      data: @asset,
      url: merchant_asset_path(@file),
      reset_url: edit_merchant_asset_path(@file, reset: true),
      javascripts: @javascripts,
      stylesheets: @stylesheets,
      locales: @locales,
      templates: @templates
    }
  end

  private
  def load_assets
    @javascripts = Asset::Javascript.all.as_json({only: [:id, :name]})
    @stylesheets = Asset::Stylesheet.all.as_json({only: [:id, :name]})
    @locales = Asset::Locale.all.as_json({only: [:id, :name]})
  end

  def load_templates
    @templates = Template.all.as_json({only: [:id, :name, :directory]}).group_by{|t| t["directory"]}
  end
end
