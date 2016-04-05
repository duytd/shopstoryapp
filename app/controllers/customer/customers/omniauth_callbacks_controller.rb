class Customer::Customers::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def doindie
    @customer = Customer.from_omniauth request.env["omniauth.auth"]

    if @customer.persisted?
      sign_in_and_redirect @customer, event: :authentication
      set_flash_message(:notice, :success, kind: "Doindie") if is_navigational_format?
    else
      session["devise.doindie_data"] = request.env["omniauth.auth"]
      flash[:alert] = @customer.errors.full_messages.join ", "
      redirect_to new_customer_registration_path
    end
  end

  def failure
    redirect_to root_path
  end
end
