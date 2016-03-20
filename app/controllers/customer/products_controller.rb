class Customer::ProductsController < Customer::BaseController
  load_and_authorize_resource

  def show
    @props = {
      globalVars: @globalVars,
      product: @product,
      variations: @product.variations.not_master,
      master: @product.master,
      variations: @product.variations,
      cart_url: customer_order_products_path
    }
  end
end
