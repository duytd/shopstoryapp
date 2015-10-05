class Customer::CategoriesController < Customer::BaseController
  load_and_authorize_resource

  def index
  end

  def show
    products = @category.products.visible
    @props = {
      globalVars: @globalVars,
      products: products
    }
  end
end
