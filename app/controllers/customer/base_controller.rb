class Customer::BaseController < ApplicationController
  include ShopsLoading
  include BreadcrumbHelper

  before_action :set_cache_namespace, :set_default_meta_tags

  def current_ability
    @current_ability ||= Ability.new current_customer
  end

  def self.add_breadcrumb name, path = nil, options={}
    before_action(options) do |controller|
      controller.send :add_breadcrumb, name, Rails.application.routes.url_helpers.send(path)
    end
  end

  private
  def set_cache_namespace
    ENV["RAILS_CACHE_ID"] = [Apartment::Tenant.current, "customer"].compact.join("-")
  end

  def set_default_meta_tags
    meta_title = current_shop.meta_title.present? ? current_shop.meta_title : current_shop.name
    generate_meta_tags meta_title, current_shop.meta_description, current_shop.meta_keywords
  end
end
