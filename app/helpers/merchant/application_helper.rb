module Merchant::ApplicationHelper
  def current_ability
    @current_ability ||= Ability.new current_merchant
  end

  def current_shop
    @current_shop ||= current_merchant.shop
  end

  def current_theme_editor
    session[:theme_editor_id] || current_shop.theme_editors.with_theme(current_shop.theme_id).id
  end

  def current_subdomain
    session[:subdomain] || current_shop.subdomain
  end
end
