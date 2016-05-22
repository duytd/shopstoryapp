class Customer::PasswordsController < Devise::PasswordsController
  include ShopsLoading

  def new
    @props = {
      globalVars: @globalVars
    }
  end

  def edit
    @props = {
      globalVars: @globalVars,
      token: params[:reset_password_token]
    }
  end

  def create
    self.resource = warden.authenticate!({scope: resource_name, recall: "#{controller_path}#login_failed"})
    sign_in :customer, resource
    redirect_url = params[:redirect_url] || after_sign_in_path_for(resource)

    render json: {redirect_url: redirect_url}, status: :ok
  end
end
