class Merchant::SearchController < Merchant::BaseController
  def search
    @products = Product.search(params[:q]).page params[:page]
    @categories = Category.search(params[:q]).page params[:page]
    @custom_pages = CustomPage.search(params[:q]).page params[:page]
    @customers = Customer.search(params[:q]).page params[:page]

    @props = {
      products: @products.map{|p| p._source.merge({highlight: p.highlight})},
      categories: @categories.map{|p| p._source.merge({highlight: p.highlight})},
      custom_pages: @custom_pages.map{|p| p._source.merge({highlight: p.highlight})},
      customers: @customers.map{|p| p._source.merge({highlight: p.highlight})}
    }

    render json: @props, status: :ok
  end
end
