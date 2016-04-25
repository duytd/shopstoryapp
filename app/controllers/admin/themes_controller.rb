class Admin::ThemesController < Admin::BaseController
  before_action :load_theme, only: [:edit, :update, :destroy]

  def index
    @themes = Theme.all
  end

  def new
    @theme = Theme.new
  end

  def create
    @theme = Theme.new theme_params

    if @theme.save
      redirect_to admin_themes_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @theme.update theme_params
      redirect_to admin_themes_path
    else
      render :new
    end
  end

  def destroy
    @theme.destroy
    redirect_to admin_themes_path
  end

  private
  def load_theme
    @theme = Theme.find params[:id]
  end

  def theme_params
    params.require(:theme).permit :name, :directory, :description, :actived
  end
end
