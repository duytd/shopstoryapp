class Customer::SearchController < Customer::BaseController
  def search
    add_breadcrumb I18n.t("customer.breadcrumbs.home"), customer_root_path
    add_breadcrumb I18n.t("customer.breadcrumbs.search", q: params[:q]), customer_search_path(q: params[:q])

    @products = Product.search(params[:q]).page params[:page]

    @props = paginating @products, {
      globalVars: @globalVars,
      products: @products.map{|p| p._source.merge({highlight: p.highlight})},
      pagination_url: customer_search_path(q: params[:q]),
      breadcrumb: current_breadcrumb
    }
  end
end
