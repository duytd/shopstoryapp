class Customer::CustomPagesController < Customer::BaseController
  def show
    @custom_page = CustomPage.find params[:id]

    @props = {
      globalVars: @globalVars,
      customer: current_customer,
      page: @custom_page
    }
  end
end
