class Customer::ProductsController < Customer::BaseController
  load_and_authorize_resource

  def show
    @props = {
      globalVars: @globalVars,
      product: @product,
      cart_url: customer_order_products_path
    }
  end
end
