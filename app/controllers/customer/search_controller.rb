class Customer::SearchController < Customer::BaseController
  def search
    add_breadcrumb I18n.t("customer.breadcrumbs.home"), customer_root_path
    add_breadcrumb I18n.t("customer.breadcrumbs.search", q: params[:q]), customer_search_path(q: params[:q])

    if params[:q].blank?
      @products = []
    else
      @products = Product.search(params[:q]).page params[:page]
    end

    @props = paginating @products, {
      globalVars: @globalVars,
      products: @products.map{|p| Customer::ProductPresenter.new(p._source).as_json.merge({highlight: p.highlight, images: p.images})},
      pagination_url: customer_search_path(q: params[:q]),
      breadcrumb: current_breadcrumb
    }
  end
end
