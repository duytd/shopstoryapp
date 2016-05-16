class Customer::ProductsController < Customer::BaseController
  load_and_authorize_resource

  def show
    category = category_from_referer_path || @product.categories.first

    add_breadcrumb I18n.t("customer.breadcrumbs.home"), Rails.application.routes.url_helpers.customer_root_path
    add_breadcrumb I18n.t("customer.breadcrumbs.categories"), customer_categories_path
    add_breadcrumb category.name, customer_category_path(category)

    @props = {
      globalVars: @globalVars,
      product: Customer::ProductPresenter.new(@product),
      variations: @product.variations.not_master.map{|v| Customer::VariationPresenter.new(v)},
      master: Customer::VariationPresenter.new(@product.master),
      options: @product.variation_options.relating_to_variations.map{|v| Customer::OptionPresenter.new(v)},
      cart_url: customer_order_products_path,
      breadcrumb: current_breadcrumb
    }

    render_meta_tags @product, {title: @product.name, meta_description: @product.description}
  end

  private
  def category_from_referer_path
    begin
      referer = Rails.application.routes.recognize_path URI(request.referer || "").path
      if referer[:controller] == "customer/categories" && referer[:action] == "show"
        return Category.find referer[:id]
      else
        return nil
      end
    rescue ActionController::RoutingError
      nil
    end
  end
end
