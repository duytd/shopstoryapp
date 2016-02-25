class Merchant::PagesController < Merchant::BaseController
  def dashboard
  end

  def credentials
    @props = {
      credentials: {
        client_id: current_shop.client_id,
        api_key: current_shop.api_key,
      }
    }
  end
end
