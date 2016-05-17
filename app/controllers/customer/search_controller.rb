class Customer::SearchController < Customer::BaseController
  def search
    if params[:q].nil?
      @products = []
    else
      @products = Product.search(params[:q]).page params[:page]
    end

    @props = paginating @products, {
      globalVars: @globalVars,
      products: @products.map{|p| Customer::ProductPresenter.new(p)},
      pagination_url: customer_search_path(q: params[:q]),
    }
  end
end
