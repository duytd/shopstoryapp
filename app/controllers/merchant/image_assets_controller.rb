class Merchant::ImageAssetsController < Merchant::BaseController
  def create
    asset = Asset::Image.new(image_asset_params)

    if asset.save
      render json: asset, status: :ok
    else
      render json: asset.errors, status: :unprocessable_entity
    end
  end

  def image_asset_params
    params.require(:image_asset).permit(:image)
  end
end
