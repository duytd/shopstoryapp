class Admin::PagesController < Admin::BaseController
  def dashboard
    @shops_count = Shop.count
  end
end
