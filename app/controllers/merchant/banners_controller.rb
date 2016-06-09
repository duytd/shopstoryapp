class Merchant::BannersController < Merchant::BaseController
  before_action :load_banner, only: :edit
  load_and_authorize_resource

  def index
   if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      url: merchant_banners_path,
      method: :post,
      redirect_url: merchant_banners_path
    }
  end

  def create
    @banner = Banner.new banner_params

    if @banner.save
      render json: @banner, status: :ok
    else
      render json: @banner.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      banner: present(@banner),
      banner_items: @banner.banner_items,
      url: merchant_banner_path(@banner),
      redirect_url: merchant_banners_path,
      method: :put
    }
  end

  def update
    if @banner.update banner_params
      render json: present(@banner), status: :ok
    else
      render json: @banner.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @banner.destroy
    render json: nil, status: :ok
  end

  private
  def load_banner
    @banner = Banner.find params[:id]
  end

  def list_all
    @banners = Banner.page params[:page]

    @props = paginating @banners, {
      banners: @banners.map{|b| present(b)},
      new_url: new_merchant_banner_path,
      url: merchant_banners_path,
    }

    respond_to do |format|
      format.html
      format.json {render json: @props, status: :ok}
    end
  end

  def delete_all
    Banner.where(id: params[:banner_ids]).destroy_all
    render json: nil, status: :ok
  end

  def banner_params
    params.require(:banner).permit :name, banner_items_attributes: [:id, :text, :link, :image, :show_image, :_destroy]
  end
end
