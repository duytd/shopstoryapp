class Merchant::AfterSignupsController < Merchant::BaseController
  def show
    check_setup_step

    @props = {
      current_step: current_merchant.setup_step,
      shop: current_merchant.shop,
      skip_url: skip_merchant_after_signup_path,
      next_url: merchant_after_signup_path
    }
  end

  def update
    case current_merchant.setup_step
    when "provide_business_info"
      provide_business_info
    when "generate_sample_data"
      generate_sample_data
    else
      head :unauthorized
    end
  end

  def provide_business_info
    current_shop.setting_up = true

    if current_shop.update shop_params
      current_merchant.next_setup_step!
      render json: {current_step: current_merchant.setup_step}, status: :ok
    else
      render json: current_shop.errors, status: :unprocessable_entity
    end
  end

  def generate_sample_data
    ShopService.new({shop: current_shop}).create_sample_data
    current_merchant.next_setup_step!
    render json: {current_step: current_merchant.setup_step, redirect_url: merchant_root_path}, status: :ok
  end

  def skip
    current_merchant.next_setup_step!

    if current_merchant.done?
      render json: {current_step: current_merchant.setup_step, redirect_url: merchant_root_path}, status: :ok
    else
      render json: {current_step: current_merchant.setup_step}, status: :ok
    end
  end

  private
  def check_setup_step
    # if current_merchant.done?
    #   redirect_to merchant_root_path
    # end
  end

  def shop_params
    params.require(:shop).permit :legal_name, :ceo, :business_number, :online_retail_number, :privacy_manager, :privacy_email, :service_phone
  end
end
