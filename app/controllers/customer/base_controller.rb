class Customer::BaseController < ApplicationController
  include ThemesLoading

  def current_ability
    @current_ability ||= Ability.new current_customer
  end
end
