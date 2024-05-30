module ApplicationHelper
  include ReactOnRailsHelper
  include DomainHelper

  def full_title page_title
    base_title = t "application.title"
    page_title.empty? ? base_title : page_title << " | " << base_title
  end

  def current_breadcrumb
    @current_breadcrumb ||= []
  end

  def render_breadcrumb
    react_component "Breadcrumb", { props: { breadcrumb: current_breadcrumb } }
  end
end
