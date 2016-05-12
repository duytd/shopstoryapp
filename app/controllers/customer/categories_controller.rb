class Customer::CategoriesController < Customer::BaseController
  load_and_authorize_resource

  def index
    add_breadcrumb I18n.t("customer.breadcrumbs.home"), Rails.application.routes.url_helpers.customer_root_path
    add_breadcrumb I18n.t("customer.breadcrumbs.categories"), customer_categories_path

    @categories = Category.all.map{|c| Customer::CategoryPresenter.new(c, {limit: 3})}

    @props = {
      globalVars: @globalVars,
      categories: @categories,
      breadcrumbs: current_breadcrumb
    }
  end

  def show
    add_breadcrumb I18n.t("customer.breadcrumbs.home"), Rails.application.routes.url_helpers.customer_root_path
    add_breadcrumb I18n.t("customer.breadcrumbs.categories"), customer_categories_path

    @products = @category.products.visible.page params[:page]
    render_meta_tags @category, {title: @category.name}
    render_props
  end

  def filter
    @category = Category.find params[:id]
    @products = @category.products
                                  .visible
                                  .filtered_by_vendor(params[:vendor].try(:split, ","))
                                  .filtered_by_price(params[:price])
                                  .sorted_by(params[:sorted_by], params[:sort_direction])
                                  .page(params[:page])


    respond_to do |format|
      format.html do
        render_props
        render :show
      end
      format.json do
        render json: paginating(@products, {
          data: @products.map{|p| Customer::ProductPresenter.new(p)}
        })
      end
    end
  end

  def render_props
    @props = paginating @products, {
      globalVars: @globalVars,
      category: Customer::CategoryPresenter.new(@category),
      products: @products.map{|p| Customer::ProductPresenter.new(p)},
      pagination_url: customer_category_path(@category),
      breadcrumbs: current_breadcrumb,
      filter: {
        url: filter_customer_category_path(@category),
        vendor: @category.vendor_filter,
        price: @category.price_filter
      }
    }
  end
end
