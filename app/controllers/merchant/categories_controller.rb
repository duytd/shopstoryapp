class Merchant::CategoriesController < Merchant::BaseController
  include ApplicationHelper

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
      data: @category,
      url: merchant_categories_path,
      redirect_url: merchant_categories_path,
      method: :post
    }
  end

  def create
    @category = Category.new category_params
    if @category.save
      render json: {data: @category, status: :success}
    else
      render json: {data: @category.errors, status: :unprocessed_entity}
    end
  end

  def edit
    @props = {
      en_category: load_translation(@category.translations, :en),
      ko_category: load_translation(@category.translations, :ko),
      url: merchant_category_path(@category),
      method: :put,
      redirect_url: merchant_categories_path
    }
  end

  def update
    if @category.update category_params
      render json: {data: @category, status: :success}
    else
      render json: {data: @category.errors, status: :unprocessed_entity}
    end
  end

  def destroy
    @category.destroy
    render json: {status: :success}
  end

  private
  def list_all
    categories = Category.all
    @props = {
      data: categories.to_json,
      url: new_merchant_category_path
    }
  end

  def delete_all
    Category.where(id: params[:category_ids]).destroy_all
    render json: {status: :success}
  end

  def category_params
    params.require(:category).permit *Category.globalize_attribute_names
  end
end
