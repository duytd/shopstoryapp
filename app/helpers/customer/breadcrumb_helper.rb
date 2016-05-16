module Customer::BreadcrumbHelper
  def current_breadcrumb
    @current_breadcrumb ||= []
  end

  def add_breadcrumb label, url
    current_breadcrumb << {label: label, url: url}
  end
end
