class Merchant::PagesController < Merchant::BaseController
  def dashboard
  end

  def credentials
    @props = {
      credentials: {
        api_key: current_shop.api_key,
      }
    }
  end
end
