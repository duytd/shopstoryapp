class Customer::BaseController < ApplicationController
  include ShopsLoading
  include BreadcrumbHelper

  def current_ability
    @current_ability ||= Ability.new current_customer
  end

  def self.add_breadcrumb name, path = nil, options={}
    before_action(options) do |controller|
      controller.send :add_breadcrumb, name, Rails.application.routes.url_helpers.send(path)
    end
  end
end
