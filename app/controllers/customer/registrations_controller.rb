class Customer::RegistrationsController < Devise::RegistrationsController
  include ShopsLoading

  before_filter :configure_permitted_parameters

  def new
    term = current_shop.term ? Customer::CustomPagePresenter.new(current_shop.term) : nil
    privacy = current_shop.privacy ? Customer::CustomPagePresenter.new(current_shop.privacy) : nil

    @props = {
      globalVars: @globalVars,
      term: term,
      privacy: privacy
    }
    super
  end

  def create
    build_resource sign_up_params
    resource.save

    if resource.persisted?
      if resource.active_for_authentication?
        sign_in resource_name, resource
        return render json: {redirect_url: after_sign_up_path_for(resource)}, status: :ok
      else
        expire_session_data_after_sign_in!
        return render json: {redirect_url: after_inactive_sign_up_path_for(resource)}, status: :ok
      end
    else
      return render json: {errors: resource.errors.full_messages.uniq}, status: :unprocessable_entity
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit :full_name, :email, :password, :password_confirmation, :term, :privacy
    end
  end
end
