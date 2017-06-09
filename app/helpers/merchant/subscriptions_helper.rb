module Merchant::SubscriptionsHelper
  def trial_expired_for? user
    remaining_days(user) <= 0
  end

  def remaining_days user
    days_left = ((user.created_at + Settings.free_trial_length.days).to_date - Date.today).round
    return 0 if days_left < 0
    days_left
  end
end
