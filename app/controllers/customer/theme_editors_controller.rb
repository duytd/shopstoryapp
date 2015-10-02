require "minifier"

class Customer::ThemeEditorsController < Customer::BaseController
  protect_from_forgery except: :show
  caches_action :show

  def show
    @theme_editor = @current_shop.theme_editors.with_theme @current_theme

    respond_to do |format|
      format.css {load_stylesheet}
      format.js {load_javascript}
    end
  end

  private
  def load_stylesheet
    stylesheet = Minifier.minify_css @theme_editor.stylesheet
    render text: stylesheet, content_type: "text/css"
  end

  def load_javascript
    javascript = Minifier.minify_js @theme_editor.javascript
    render js: javascript
  end
end
