require "minifier"

class Customer::ThemeEditorsController < Customer::BaseController
  protect_from_forgery except: :show
  caches_action :show

  def show
    @theme_editor = @current_shop.theme_editors.with_theme @current_theme

    respond_to do |format|
      format.css {load_stylesheet}
      format.js do
        case params[:type]
        when "en_locale"
          load_en_locale
        when "ko_locale"
          load_ko_locale
        else
          load_javascript
        end
      end
    end
  end

  private
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
