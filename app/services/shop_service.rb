class ShopService
  def initialize params
    @shop = params[:shop]
  end

  def create_initial_data
    Apartment::Tenant.switch @shop.subdomain

    EmailTemplateService.new({shop: @shop}).create_initial_data
    PaymentMethodService.new({shop: @shop}).create_initial_data
    CustomPageService.new({shop: @shop}).create_initial_data
    MenuService.new({shop: @shop}).create_initial_data
  end

  def create_sample_data
    CategoryService.new.create_sample_data
    ProductService.new.create_sample_data
  end
end
