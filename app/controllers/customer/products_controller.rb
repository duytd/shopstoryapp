class Customer::ProductsController < Customer::BaseController
  before_action :load_product, only: :show
  before_action :load_category, only: :index

  def index
    @products = @category.products.limit params[:limit]

    render json: @products.map{|p| present(p)}, status: :ok
  end

  def show
    load_global_variables
    category = category_from_referer_path || @product.categories.first

    add_breadcrumb I18n.t("customer.breadcrumbs.home"), Rails.application.routes.url_helpers.customer_root_path
    add_breadcrumb I18n.t("customer.breadcrumbs.categories"), customer_categories_path
    add_breadcrumb(category.name, customer_category_path(category)) if category

    @props = {
      globalVars: @globalVars,
      product: present(@product),
      variations: @product.variations.not_master.map{|v| present(v)},
      master: present(@product.master),
      options: @product.variation_options.relating_to_variations.map{|v| present(v)},
      cart_url: customer_order_products_path,
      breadcrumb: current_breadcrumb
    }

    render_meta_tags @product, {title: @product.name, meta_description: @product.description}
  end

  private

  def load_product
    @product = Product.find params[:id]
  end

  def load_category
    @category = Category.find params[:category_id]
  end

  def category_from_referer_path
    begin
      referer = Rails.application.routes.recognize_path URI(request.referer || "").path
      if referer[:controller] == "customer/categories" && referer[:action] == "show"
        return Category.find referer[:id]
      else
        return nil
      end
    rescue ActionController::RoutingError
      nil
    end
  end
end
