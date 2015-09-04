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

  private
  def sign_up_params
    params.require(:merchant).permit :subdomain, :email, :password,
      :password_confirmation, :shop_name
  end

  def account_update_params
    params.require(:user).permit :first_name, :last_name, :email,
      :password, :password_confirmation, :current_password
  end
end
