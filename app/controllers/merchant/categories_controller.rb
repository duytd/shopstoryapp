class Merchant::CategoriesController < Merchant::BaseController
  before_action :load_category, only: :edit
  load_and_authorize_resource

  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:index, :new, :edit]}
  add_breadcrumb I18n.t("merchant.breadcrumbs.categories"), :merchant_categories_path, {only: [:new, :edit]}

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
      redirect_url: merchant_categories_path,
      method: :post
    }
  end

  def create
    @category = Category.new category_params
    if @category.save
      render json: present(@category), status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      seo_tag: @category.seo_tag ? present(@category.seo_tag) : nil,
      category: present(@category),
      url: merchant_category_path(@category),
      redirect_url: merchant_categories_path,
      method: :put
    }
  end

  def update
    if @category.update category_params
      render json: present(@category), status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
    render json: nil, status: :ok
  end

  private
  def load_category
    @category = Category.find params[:id]
  end

  def list_all
    @categories = Category.page params[:page]

    @props = paginating @categories, {
      categories: @categories.map{|c| present(c)},
      new_url: new_merchant_category_path,
      url: merchant_categories_path
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
