class Merchant::ProductsController < Merchant::BaseController
  before_action :load_product, only: [:edit]
  load_and_authorize_resource

  before_action :load_categories, only: [:new, :edit, :index]

  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:index, :new, :edit]}
  add_breadcrumb I18n.t("merchant.breadcrumbs.products"), :merchant_products_path, {only: [:new, :edit]}

  def index
   if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      categories: @categories.map{|c| present(c)},
      default_option_names: VariationOption.default_names,
      redirect_url: merchant_products_path
    }
  end

  def create
    @product = Product.new product_params
    if @product.save
      @props = {
        product: present(@product),
        variation_options: @product.variation_options,
      }

      render json: @props, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: present(@product), status: :ok
  end

  def edit
    @props = {
      seo_tag: @seo_tag ? present(@seo_tag) : nil,
      product: present(@product),
      categories: @categories.map{|c| present(c)},
      category_ids: @product.category_ids,
      variation_options: @product.variation_options,
      variations: @product.variations.not_master.map{|v| present(v)},
      default_option_names: VariationOption.default_names,
      product_images: @product.product_images,
      redirect_url: merchant_products_path
    }
  end

  def update
    if @product.update product_params

      @props = {
        product: present(@product),
        variation_options: @product.variation_options,
        variations: @product.variations.not_master
      }

      render json: @props, status: :ok
    else
      variation_errors = @product.variations.reject{|v| v.master?}.enum_for(:each_with_index).collect{|variation, index|
        variation.errors
      }.compact

      render json: @product.errors.to_hash.merge({variations: variation_errors}), status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    render json: nil, status: :ok
  end

  def search
    products = Product.search_by_name(params[:q])
    render json: products.map{|p| present(p)}, status: :ok
  end

  def import
    ImportExportService.new({klass: "Product", attributes: Product::ATTRIBUTES}).import params[:file]
    render json: nil, status: :ok
  rescue InvalidExtensionException
    render json: {message: I18n.t("import.invalid_extension")}, status: :bad_request
  rescue RowLimitExceededException
    render json: {message: I18n.t("import.row_limit_exceeded", {limit: Settings.import.row_limit})}, status: :bad_request
  rescue SpreadSheetNotFoundException
    render json: {message: I18n.t("import.not_found")}, status: :bad_request
  end

  def export
    if params[:all]
      @products = Product.latest
    else
      @products = Product.where id: params[:product_ids]
    end

    send_data ImportExportService.new({objects: @products, attributes: Product::ATTRIBUTES}).export
  end

  private
  def load_product
    @product = Product.find params[:id]
    @seo_tag = @product.seo_tag
  end

  def load_categories
    @categories = Category.latest
  end

  def list_all
    @selected_category = Category.find(params[:category_id]) if params[:category_id].present?
    @sorted_by = params[:sorted_by]
    @sort_direction = params[:sort_direction]
    @products = Product.filtered_by_category(params[:category_id])
                                  .sorted_by(@sorted_by, @sort_direction)
                                  .latest
                                  .page(params[:page])
    render_props

    respond_to do |format|
      format.html
      format.json {render json: @props, status: :ok}
    end
  end

  def delete_all
    Product.where(id: params[:product_ids]).destroy_all
    render json: nil, status: :ok
  end

  def render_props
    @props = paginating @products, {
      filter: {
        category: present(@selected_category)
      },
      sorting: {
        sorted_by: @sorted_by,
        sort_direction: @sort_direction
      },
      categories: @categories.map{|c| present(c)},
      products: @products.map{|p| present(p)},
      new_url: new_merchant_product_path,
      url: merchant_products_path,
      export_url: export_merchant_products_path,
      import_url: import_merchant_products_path
    }
  end

  def product_params
    permitted = Product.globalize_attribute_names + [:price, :slug, :sale_off, :visibility, :flat_shipping_rate, :featured, :pay_shipping_on_delivery, :weight,
      :vendor, :sku, :in_stock, :unlimited, category_ids: [], product_images: [],
      variations_attributes: [:id, :sku, :price, :image, :in_stock, :unlimited, :_destroy, variation_variation_option_values_attributes: [:id, :variation_option_value_id, :_destroy]],
      variation_options_attributes: [:id, :name, :_destroy, variation_option_values_attributes: [:id, :name, :_destroy]],
      product_images_attributes: [:id, :image, :featured, :_destroy],
      seo_tag_attributes: SeoTag.globalize_attribute_names + [:id]]
    params.require(:product).permit *permitted
  end
end
