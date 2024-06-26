class Customer::CategoriesController < Customer::BaseController
  load_and_authorize_resource

  add_breadcrumb I18n.t("customer.breadcrumbs.home"), :customer_root_path, {only: [:index, :show]}
  add_breadcrumb I18n.t("customer.breadcrumbs.categories"), :customer_categories_path, {only: [:index, :show]}

  def index
    load_global_variables
    @categories = Category.page(params[:page]).per(5)

    @props = paginating @categories, {
      globalVars: @globalVars,
      categories: @categories.map{|c| present(c, {limit: 8})},
      breadcrumb: current_breadcrumb,
      url: customer_categories_path
    }
  end

  def show
    load_global_variables
    add_breadcrumb @category.name, customer_category_path(@category)

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
          data: @products.map{|p| present(p)}
        })
      end
    end
  end

  def render_props
    @props = paginating @products, {
      globalVars: @globalVars,
      category: present(@category),
      products: @products.map{|p| present(p)},
      url: customer_category_path(@category),
      breadcrumb: current_breadcrumb,
      filter: {
        url: filter_customer_category_path(@category),
        vendor: @category.vendor_filter,
        price: @category.price_filter
      }
    }
  end
end
