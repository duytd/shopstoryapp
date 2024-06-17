class Customer::ThemeBundlesController < Customer::BaseController
  protect_from_forgery only: []
  before_action :load_theme_bundle

  def styles
    render plain: @theme_bundle.stylesheet, content_type: "text/css"
  end

  def scripts
    render plain: @theme_bundle.javascript, content_type: "text/javascript"
  end

  def templates
    render plain: @theme_bundle.template, content_type: "text/javascript"
  end

  def locale
    render plain: @theme_bundle.locale, content_type: "text/javascript"
  end

  private

  def load_theme_bundle
    @theme_bundle = current_shop.theme_bundles.with_theme current_shop.theme_id
  end
end
