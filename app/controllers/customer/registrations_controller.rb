class Customer::RegistrationsController < Devise::RegistrationsController
  include ShopsLoading

  def new
    @props = {
      globalVars: @globalVars
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
      return render json: {errors: resource.errors.full_messages}, status: :unprocessable_entity
    end
  end
end
