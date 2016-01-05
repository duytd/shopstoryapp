class Customer::SessionsController < Devise::SessionsController
  include ShopsLoading

  def new
    @props = {
      globalVars: @globalVars,
    }
    super
  end

  def create
    self.resource = warden.authenticate!({scope: resource_name, recall: "#{controller_path}#login_failed"})
    sign_in :customer, resource
    redirect_url = params[:redirect_url] || after_sign_in_path_for(resource)

    render json: {status: :success, redirect_url: redirect_url}
  end

  def login_failed
    return render json: {status: :unprocess_entity,
      error: t("devise.failure.invalid", authentication_keys: :email)}
  end
end
