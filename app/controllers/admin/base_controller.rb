class Admin::BaseController < ApplicationController
  layout "admin/layouts/application"

  before_action :authenticate_admin!

  private
  def authenticate_admin!
    unless admin_signed_in?
      redirect_to new_admin_session_url domain: Settings.app.domain, subdomain: "admin"
    end
  end
end
