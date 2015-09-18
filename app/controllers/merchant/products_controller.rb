class Merchant::ProductsController < Merchant::BaseController
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
  end

  def create
    @product = Product.new product_params
    if @product.save
      render json: {data: @product, status: :success}
    else
      render json: {data: @product.errors, status: :unprocessed_entity}
    end
  end

  def edit
  end

  def update
    if @product.update product_params
      render json: {data: @product, status: :success}
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
    @products = Product.latest
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
