class Customer::CustomPagesController < Customer::BaseController
  def show
    load_global_variables

    @custom_page = CustomPage.find params[:id]

    add_breadcrumb I18n.t("customer.breadcrumbs.home"), customer_root_path
    add_breadcrumb @custom_page.title, customer_custom_page_path(@custom_page)

    @props = {
      globalVars: @globalVars,
      page: present(@custom_page),
      breadcrumb: current_breadcrumb
    }

    render_meta_tags @custom_page, {title: @custom_page.title, meta_description: @custom_page.content}
  end
end
