class Customer::ProductsController < Customer::BaseController
  load_and_authorize_resource

  def show
    @props = {
      globalVars: @globalVars,
      product: @product,
      variations: @product.variations.not_master,
      master: @product.master,
      options: @product.variation_options.relating_to_variations,
      cart_url: customer_order_products_path
    }

    render_meta_tags @product, {title: @product.name, meta_description: @product.description}
  end
end
