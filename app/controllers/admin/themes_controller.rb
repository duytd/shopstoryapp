class Admin::ThemesController < Admin::BaseController
  before_action :load_theme, only: [:edit, :update, :destroy]

  def index
    @themes = Theme.all
    theme_dirs = @themes.map{|theme| theme.directory}

    @stalled_themes = []

    Theme.theme_dirs.each do |dir|
      unless theme_dirs.include? dir.downcase
        theme_info = Theme.get_theme_information dir
        @stalled_themes << {
          directory: dir,
          name: dir.gsub(/-/, " ").capitalize,
          description: theme_info["description"],
          author: theme_info["author"],
          version: theme_info["version"],
        }
      end
    end
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
      render :edit
    end
  end

  def install
    directory = params[:directory]
    info = Theme.get_theme_information directory

    theme = Theme.new(
      directory: directory.downcase,
      name: directory.gsub(/-/, " ").capitalize,
      description: info["description"],
      author: info["author"],
      version: info["version"],
    )

    if theme.save
      flash[:success] = I18n.t("admin.themes.flashes.theme_installed", theme: theme.name)
    else
      flash[:alert] = I18n.t("admin.themes.flashes.install_failed", theme: directory)
    end

    redirect_to admin_themes_path
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
    params.require(:theme).permit :name, :directory, :description, :image, :actived, :default
  end
end
