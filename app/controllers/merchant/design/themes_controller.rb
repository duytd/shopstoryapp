class Merchant::Design::ThemesController < Merchant::BaseController
  def index
    themes = Theme.all

    @props = {
      themes: themes,
      current_theme: current_shop.theme
    }
  end

  def create
    @theme = Theme.find params[:theme_id]
    current_shop.theme = @theme
    current_shop.save

    head :ok
  end
end
