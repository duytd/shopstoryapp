class Admin::PagesController < Admin::BaseController
  def dashboard
    @shops = Shop.all
  end
end
