class Merchant::AssetsController < Merchant::BaseController
  load_and_authorize_resource
  before_action :load_theme_bundle, only: :update

  def edit
    if params[:reset]
      reset
    else
      normal_edit
    end
  end

  def update
    @asset.theme_bundle = @theme_bundle

    begin
      if @asset.update asset_params
        render json: present(@asset, {sti: true}), status: :ok
      else
        render json: @asset.errors, status: :unprocessable_entity
      end
    rescue Sass::SyntaxError, ExecJS::ProgramError => e
      render json: {message: e.message.split("\n").first}, status: :bad_request
    end
  end

  private
  def normal_edit
    @props = {
      data: present(@asset, {sti: true}),
      url: merchant_asset_path(@asset),
      reset_url: edit_merchant_asset_path(@asset, reset: true),
    }

    render json: @props, status: :ok
  end

  def reset
    content = @asset.theme.read_file @asset.path
    render json: {data: content, status: :ok}
  end

  def asset_params
    params.require(:asset).permit :content
  end

  def load_theme_bundle
    @theme_bundle = @current_shop.theme_bundles.with_theme @current_shop.theme_id
  end
end
