class Merchant::ProductsController < Merchant::BaseController
  before_filter :load_product, only: [:edit, :update]
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
      categories: @categories.map{|c| Merchant::CategoryPresenter.new(c)},
      default_option_names: VariationOption.default_names,
      redirect_url: merchant_products_path
    }
  end

  def create
    @product = Product.new product_params
    if @product.save
      @props = {
        product: Merchant::ProductPresenter.new(@product),
        variation_options: @product.variation_options,
      }

      render json: @props, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      seo_tag: Merchant::SeoTag.new(@product.seo_tag),
      product: Merchant::ProductPresenter.new(@product),
      categories: @categories.map{|c| Merchant::CategoryPresenter.new(c)},
      category_ids: @product.category_ids,
      variation_options: @product.variation_options,
      variations: @product.variations.not_master.map{|v| Merchant::VariationPresenter.new(v)},
      default_option_names: VariationOption.default_names,
      product_images: @product.product_images,
      redirect_url: merchant_products_path
    }
  end

  def update
    if @product.update product_params

      @props = {
        product: Merchant::ProductPresenter.new(@product),
        variation_options: @product.variation_options,
        variations: @product.variations.not_master
      }

      render json: @props, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    render json: nil, status: :ok
  end

  def search
    @search = Product.search_by_name params[:q]
    render json: @search, status: :ok
  end

  def import
    Product.import params[:file]
    render nothing: true, status: :ok
  end

  def export
    if params[:all]
      @products = Product.latest
    else
      @products = Product.where id: params[:product_ids]
    end

    send_data @products.to_csv
  end

  private
  def load_product
    @product = Product.includes(
      :product_images, :seo_tag, {variations: :variation_variation_option_values}, {variation_options: :variation_option_values}
    ).find params[:id]
  end

  def load_categories
    @categories = Category.latest
  end

  def list_all
    products = Product.latest.includes(:product_images).page params[:page]

    @props = paginating products, {
      products: products.map{|p| Merchant::ProductPresenter.new(p)},
      new_url: new_merchant_product_path,
      url: merchant_products_path,
      export_url: export_merchant_products_path,
      import_url: import_merchant_products_path
    }
  end

  def delete_all
    Product.where(id: params[:product_ids]).destroy_all
    render json: nil, status: :ok
  end

  def product_params
    permitted = Product.globalize_attribute_names + [:price, :slug, :sale_off, :visibility, :flat_shipping_rate, :featured, :pay_shipping_on_delivery,
      :vendor, :sku, :in_stock, category_ids: [], product_images: [],
      variations_attributes: [:id, :sku, :price, :image, :in_stock, :_destroy, variation_variation_option_values_attributes: [:id, :variation_option_value_id, :_destroy]],
      variation_options_attributes: [:id, :name, :_destroy, variation_option_values_attributes: [:id, :name, :_destroy]],
      product_images_attributes: [:id, :image, :featured, :_destroy],
      seo_tag_attributes: SeoTag.globalize_attribute_names + [:id]]
    params.require(:product).permit *permitted
  end
end
