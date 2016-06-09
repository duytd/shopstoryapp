class Merchant::CustomPagesController < Merchant::BaseController
  before_action :load_custom_page, only: :edit
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
      url: merchant_custom_pages_path,
      redirect_url: merchant_custom_pages_path,
      method: :post
    }
  end

  def create
    @custom_page = CustomPage.new custom_page_params
    if @custom_page.save
      render json: present(@custom_page), status: :ok
    else
      render json: @custom_page.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      seo_tag: @custom_page.seo_tag ? present(@custom_page.seo_tag) : nil,
      custom_page: present(@custom_page),
      url: merchant_custom_page_path(@custom_page),
      redirect_url: merchant_custom_pages_path,
      method: :put
    }
  end

  def update
    if @custom_page.update custom_page_params
      render json: present(@custom_page), status: :ok
    else
      render json: @custom_page.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @custom_page.destroy
    render json: nil, status: :ok
  end

  private
  def load_custom_page
    @custom_page = CustomPage.find params[:id]
  end

  def list_all
    @custom_pages = CustomPage.all.page params[:page]

    @props = paginating @custom_pages, {
      custom_pages: @custom_pages.map{|p| Merchant::CustomPagePresenter.new(p)},
      new_url: new_merchant_custom_page_path,
      url: merchant_custom_pages_path
    }
  end

  def delete_all
    CustomPage.where(id: params[:custom_page_ids]).destroy_all
    render json: nil, status: :ok
  end

  def custom_page_params
    params.require(:custom_page).permit *CustomPage.globalize_attribute_names + [:slug, seo_tag_attributes: SeoTag.globalize_attribute_names + [:id]]
  end
end
