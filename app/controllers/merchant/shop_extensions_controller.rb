class Merchant::ShopExtensionsController < Merchant::BaseController
  authorize_resource
  
  def create
    shop_extension = current_shop.shop_extensions.build extension_id: params[:extension_id] 
    
    if shop_extension.save
      render json: shop_extension, status: :ok         
    else
      render json: shop_extension.errors, status: :unprocessable_entity
    end
  end
end
