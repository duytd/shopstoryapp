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

  def account
    @props = {
      user: current_merchant,
      subscription: current_merchant.subscription,
      remaining_trial: remaining_days(current_merchant),
      plans: Plan.all,
      stripe_key: Rails.configuration.stripe[:publishable_key]
    }
  end
end
