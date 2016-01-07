class Merchant::ThemeEditorsController < Merchant::BaseController
  load_and_authorize_resource

  def edit
    if params[:reset]
      reset
    else
      normal_edit
    end
  end

  def update
    if @theme_editor.update theme_editor_params
      render json: @theme_editor, status: :ok
    else
      render json: @theme_editor.errors, status: :unprocessable_entity
    end
  end

  private
  def normal_edit
    file = params[:file] || "stylesheet"

    @props = {
      data: @theme_editor,
      file: file,
      url: merchant_theme_editor_path(@theme_editor),
      reset_url: edit_merchant_theme_editor_path(@theme_editor, reset: true),
      method: :put
    }
  end

  def reset
    file = params[:file]
    content = @theme_editor.theme.load_default_file file
    render json: {data: content, status: :success}
  end

  def theme_editor_params
    params.require(:theme_editor).permit :javascript, :stylesheet, :en_locale,
      :ko_locale
  end
end
