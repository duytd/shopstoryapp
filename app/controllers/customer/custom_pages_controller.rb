class Customer::CustomPagesController < Customer::BaseController
  def show
    @custom_page = CustomPage.find params[:id]

    @props = {
      globalVars: @globalVars,
      page: Customer::CustomPagePresenter.new(@custom_page)
    }
  end
end
