class Merchant::ProductsController < Merchant::BaseController
  include TranslationsHelper

  load_and_authorize_resource

  before_action :load_categories, only: [:new, :edit]

  def index
   if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      data: @product,
      categories: @categories,
      url: merchant_products_path,
      redirect_url: merchant_products_path,
      method: :post
    }
  end

  def create
    @product = Product.new product_params
    if @product.save
      render json: {data: @product, url: merchant_product_path(@product), status: :success}
    else
      render json: {data: @product.errors, status: :unprocessed_entity}
    end
  end

  def edit
    @props = {
      product: @product,
      en_product: load_translation(@product.translations, :en),
      ko_product: load_translation(@product.translations, :ko),
      categories: @categories,
      category_ids: @product.category_ids,
      variations: @product.variations,
      product_images: @product.product_images,
      url: merchant_product_path(@product),
      method: :put,
      redirect_url: merchant_products_path
    }
  end

  def update
    if @product.update product_params
      render json: {data: @product, url: merchant_product_path(@product), status: :success}
    else
      render json: {data: @product.errors, status: :unprocessed_entity}
    end
  end

  def destroy
    @product.destroy
    render json: {status: :success}
  end

  private
  def list_all
    products = Product.latest
    @props = {
      data: products.to_json,
      url: new_merchant_product_path
    }
  end

  def delete_all
    Product.where(id: params[:product_ids]).destroy_all
    render json: {status: :success}
  end

  def load_categories
    @categories = Category.latest
  end

  def product_params
    permitted = Product.globalize_attribute_names + [:price, :sale_off, :visibility,
      :vendor, :sku, :in_stock, category_ids: [], product_images: [],
      variations_attributes: [:id, :color, :size, :in_stock, :_destroy],
      product_images_attributes: [:id, :image, :_destroy]]
    params.require(:product).permit *permitted
  end
end
