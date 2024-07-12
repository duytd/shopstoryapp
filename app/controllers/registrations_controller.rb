class RegistrationsController < Devise::RegistrationsController
  def new
    @shop_name = params[:shop_name]

    if @shop_name && @shop_name.empty?
      flash[:danger] = t "registrations.blank_shop_name"
      render "pages/home"
    else
      super
    end
  end

  def create
    build_resource sign_up_params

    outcome = Merchants::CreateNewMerchant.run(merchant: resource)

    if outcome.valid?
      if resource.active_for_authentication?
        sign_in resource_name, resource
        return render json: {redirect_url: after_sign_up_path_for(resource)}, status: :ok
      else
        expire_data_after_sign_in!
        return render json: {redirect_url: after_inactive_sign_up_path_for(resource)}, status: :ok
      end
    else
      return render json: {errors: outcome.errors.full_messages.uniq}, status: :unprocessable_entity
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |u|
      u.permit :full_name, :email, :password, :password_confirmation, :term, :privacy
    end
  end

  private
  def sign_up_params
    params.require(:merchant).permit :email, :password,
      :password_confirmation, :shop_name
  end

  def account_update_params
    params.require(:merchant).permit :first_name, :last_name, :email,
      :password, :password_confirmation, :current_password
  end
end
