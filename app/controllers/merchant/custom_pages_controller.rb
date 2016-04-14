class Merchant::CustomPagesController < Merchant::BaseController
  load_and_authorize_resource find_by: :slug
  include TranslationsHelper

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
      method: :post
    }
  end

  def create
    @custom_page = CustomPage.new custom_page_params
    if @custom_page.save
      render json: @custom_page, status: :ok
    else
      render json: @custom_page.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      slug: @custom_page.slug,
      seo_tag: @custom_page.seo_tag,
      custom_page_en: load_translation(@custom_page.translations, :en),
      custom_page_ko: load_translation(@custom_page.translations, :ko),
      url: merchant_custom_page_path(@custom_page),
      method: :put
    }
  end

  def update
    if @custom_page.update custom_page_params
      render json: @custom_page, status: :ok
    else
      render json: @custom_page.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @custom_page.destroy
    render json: nil, status: :ok
  end

  private
  def list_all
    @custom_pages = CustomPage.all

    @props = {
      custom_pages: @custom_pages,
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
