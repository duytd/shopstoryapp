class Customer::BaseController < ApplicationController
  layout "customer/layouts/application"

  before_action :load_theme

  def current_ability
    @current_ability ||= Ability.new current_customer
  end

  def current_theme
    subdomain = Apartment::Tenant.current
    Theme.current subdomain
  end

  private
  def load_theme
    @current_theme = current_theme
  end
end
