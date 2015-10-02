class Customer::RegistrationsController < Devise::RegistrationsController
  include ShopsLoading
  
  def new
    @props = {
      globalVars: @globalVars,
      url: customer_registration_path
    }
    super
  end

  def create
    build_resource sign_up_params
    resource.save

    if resource.persisted?
      if resource.active_for_authentication?
        sign_in resource_name, resource
        return render json: {status: :success, redirect_url: after_sign_up_path_for(resource)}
      else
        expire_session_data_after_sign_in!
        return render json: {status: :success, redirect_url: after_inactive_sign_up_path_for(resource)}
      end
    else
      return render json: {status: :unprocess_entity, errors: resource.errors.full_messages}
    end
  end
end
