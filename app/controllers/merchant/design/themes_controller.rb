class Merchant::Design::ThemesController < Merchant::BaseController
  def index
    themes = Theme.all

    @props = {
      themes: themes,
      current_theme: current_shop.theme
    }
  end

  def show
    @theme = Theme.find params[:id]

    @props = {
      theme: @theme,
      current: @theme.id == current_shop.theme.id,
      install_url: merchant_design_themes_path
    }
  end

  def create
    @theme = Theme.find params[:theme_id]
    current_shop.theme = @theme
    current_shop.save

    head :ok
  end
end
