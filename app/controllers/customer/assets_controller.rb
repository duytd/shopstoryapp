require "minifier"

class Customer::AssetsController < Customer::BaseController
  protect_from_forgery only: []
  before_action :load_asset

  def styles
    load_stylesheet
  end

  def scripts
    load_javascript
  end

  def en
    load_en_locale
  end

  def ko
    load_ko_locale
  end

  private
  def load_asset
    @asset = @current_shop.assets.with_theme @current_shop.theme_id
  end

  def load_en_locale
    en_locale = Minifier.minify_js @asset.en_locale
    render js: en_locale
  end

  def load_ko_locale
    ko_locale = Minifier.minify_js @asset.ko_locale
    render js: ko_locale
  end

  def load_stylesheet
    stylesheet = Minifier.minify_css @asset.stylesheet
    render text: stylesheet, content_type: "text/css"
  end

  def load_javascript
    javascript = Minifier.minify_js @asset.javascript
    render js: javascript
  end
end
