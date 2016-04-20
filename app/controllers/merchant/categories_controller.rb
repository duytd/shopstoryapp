class Merchant::CategoriesController < Merchant::BaseController
  load_and_authorize_resource
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
      url: merchant_categories_path,
      method: :post
    }
  end

  def create
    @category = Category.new category_params
    if @category.save
      render json: @category, status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      slug: @category.slug,
      seo_tag: @category.seo_tag,
      en_category: load_translation(@category.translations, :en),
      ko_category: load_translation(@category.translations, :ko),
      url: merchant_category_path(@category),
      method: :put,
    }
  end

  def update
    if @category.update category_params
      render json: @category, status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
    render json: nil, status: :ok
  end

  private
  def list_all
    @categories = Category.page params[:page]

    @props = paginating @categories, {
      categories: @categories,
      new_url: new_merchant_category_path,
      url: merchant_categories_path,
    }

    respond_to do |format|
      format.html
      format.json {render json: @props, status: :ok}
    end
  end

  def delete_all
    Category.where(id: params[:category_ids]).destroy_all
    render json: nil, status: :ok
  end

  def category_params
    params.require(:category).permit *Category.globalize_attribute_names + [seo_tag_attributes: SeoTag.globalize_attribute_names + [:id]]
  end
end
