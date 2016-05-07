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

  def show
    render json: @product, status: :ok
  end

  def new
    @props = {
      categories: @categories,
      default_option_names: VariationOption.default_names,
      redirect_url: merchant_products_path
    }
  end

  def create
    @product = Product.new product_params
    if @product.save
      @props = {
        product: @product,
        en_product: load_translation(@product.translations, :en),
        ko_product: load_translation(@product.translations, :ko),
        variation_options: @product.variation_options,
        variations: @product.variations.not_master,
      }

      render json: @props, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      slug: @product.slug,
      seo_tag: @product.seo_tag,
      product: @product,
      en_product: load_translation(@product.translations, :en),
      ko_product: load_translation(@product.translations, :ko),
      categories: @categories,
      category_ids: @product.category_ids,
      variation_options: @product.variation_options,
      variations: @product.variations.not_master,
      default_option_names: VariationOption.default_names,
      product_images: @product.product_images,
      redirect_url: merchant_products_path
    }
  end

  def update
    if @product.update product_params

      @props = {
        product: @product,
        en_product: load_translation(@product.translations, :en),
        ko_product: load_translation(@product.translations, :ko),
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
  def list_all
    products = Product.latest.page params[:page]

    @props = paginating products, {
      products: products,
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

  def load_categories
    @categories = Category.latest
  end

  def product_params
    permitted = Product.globalize_attribute_names + [:price, :sale_off, :visibility, :flat_shipping_rate, :featured, :pay_shipping_on_delivery,
      :vendor, :sku, :in_stock, category_ids: [], product_images: [],
      variations_attributes: [:id, :sku, :price, :image, :in_stock, :_destroy, variation_variation_option_values_attributes: [:id, :variation_option_value_id, :_destroy]],
      variation_options_attributes: [:id, :name, :_destroy, variation_option_values_attributes: [:id, :name, :_destroy]],
      product_images_attributes: [:id, :image, :_destroy],
      seo_tag_attributes: SeoTag.globalize_attribute_names + [:id]]
    params.require(:product).permit *permitted
  end
end
