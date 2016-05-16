class Customer::CustomPagesController < Customer::BaseController
  def show
    @custom_page = CustomPage.find params[:id]
    
    add_breadcrumb I18n.t("customer.breadcrumbs.home"), customer_root_path
    add_breadcrumb @custom_page.title, customer_custom_page_path(@custom_page)

    @props = {
      globalVars: @globalVars,
      page: Customer::CustomPagePresenter.new(@custom_page),
      breadcrumb: current_breadcrumb
    }
  end
end
