class Customer::BaseController < ApplicationController
  include ShopsLoading

  def current_ability
    @current_ability ||= Ability.new current_customer
  end
end
