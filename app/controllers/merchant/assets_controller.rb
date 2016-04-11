class Merchant::AssetsController < Merchant::BaseController
  load_and_authorize_resource

  def edit
    if params[:reset]
      reset
    else
      normal_edit
    end
  end

  def update
    if @asset.update asset_params
      render json: @asset, status: :ok
    else
      render json: @asset.errors, status: :unprocessable_entity
    end
  end

  private
  def normal_edit
    file = params[:file] || "stylesheet"

    @props = {
      data: @asset,
      file: file,
      redirect_url: merchant_root_url,
      url: merchant_asset_path(@asset),
      reset_url: edit_merchant_asset_path(@asset, reset: true),
      method: :put
    }
  end

  def reset
    file = params[:file]
    content = @asset.theme.load_default_file file
    render json: {data: content, status: :success}
  end

  def asset_params
    params.require(:asset).permit :javascript, :stylesheet, :en_locale,
      :ko_locale
  end
end
