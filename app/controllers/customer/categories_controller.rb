class Customer::CategoriesController < Customer::BaseController
  load_and_authorize_resource

  def index
  end

  def show
    @products = @category.products.visible.page params[:page]
    render_props
  end

  def filter
    @category = Category.find params[:id]
    @products = @category.products
                                  .visible
                                  .filtered_by_vendor(params[:vendor].try(:split, ","))
                                  .filtered_by_price(params[:price])
                                  .sorted_by(params[:sorted_by], params[:sort_direction])
                                  .page params[:page]

    respond_to do |format|
      format.html do
        render_props
        render :show
      end
      format.json {render json: paginating(@products, {data: @products})}
    end
  end

  def render_props
    @props = paginating @products, {
      globalVars: @globalVars,
      category: @category,
      products: @products,
      pagination_url: customer_category_path(@category),
      filter: {
        url: filter_customer_category_path(@category),
        vendor: @category.vendor_filter,
        price: @category.price_filter
      }
    }
  end
end
