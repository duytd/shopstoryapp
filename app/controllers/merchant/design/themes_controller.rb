class Merchant::Design::ThemesController < Merchant::BaseController
  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:index, :show]}
  add_breadcrumb I18n.t("merchant.breadcrumbs.themes"), :merchant_design_themes_path, {only: [:show]}

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
