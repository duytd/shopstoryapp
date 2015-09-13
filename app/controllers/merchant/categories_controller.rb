class Merchant::CategoriesController < Merchant::BaseController
  load_and_authorize_resource

  def index
    if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
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
    @categories = Category.all
  end

  def delete_all
    Category.where(id: params[:category_ids]).destroy_all
    render json: {status: :success}
  end

  def category_params
    params.require(:category).permit *Category.globalize_attribute_names
  end
end
