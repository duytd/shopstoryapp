class Customer::SessionsController < Devise::SessionsController
  include ShopsLoading

  def new
    @props = {
      globalVars: @globalVars
    }
    super
  end

  def create
    self.resource = warden.authenticate!({scope: resource_name, recall: "#{controller_path}#login_failed"})
    sign_in :customer, resource
    redirect_url = params[:redirect_url] || after_sign_in_path_for(resource)

    render json: {redirect_url: redirect_url}, status: :ok
  end

  def login_failed
    return render json: {error: t("devise.failure.invalid", authentication_keys: :email)},
      status: :unauthorized
  end
end
