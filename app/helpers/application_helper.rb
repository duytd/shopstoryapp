module ApplicationHelper
  def full_title page_title
    base_title = t "application.title"
    page_title.empty? ? base_title : page_title << " | " << base_title
  end

  def current_breadcrumb
    @current_breadcrumb ||= []
  end

  def render_breadcrumb
    react_component "Breadcrumb", {breadcrumb: current_breadcrumb}
  end
end
