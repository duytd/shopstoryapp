require "minifier"

class Customer::ThemeEditorsController < Customer::BaseController
  protect_from_forgery only: []
  before_action :load_theme_editor

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
  def load_theme_editor
    @theme_editor = @current_shop.theme_editors.with_theme @current_shop.theme_id
  end

  def load_en_locale
    en_locale = Minifier.minify_js @theme_editor.en_locale
    render js: en_locale
  end

  def load_ko_locale
    ko_locale = Minifier.minify_js @theme_editor.ko_locale
    render js: ko_locale
  end

  def load_stylesheet
    stylesheet = Minifier.minify_css @theme_editor.stylesheet
    render text: stylesheet, content_type: "text/css"
  end

  def load_javascript
    javascript = Minifier.minify_js @theme_editor.javascript
    render js: javascript
  end
end
