# == Schema Information
#
# Table name: public.subscriptions
#
#  id         :integer          not null, primary key
#  end_at     :datetime
#  start_at   :datetime
#  status     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  plan_id    :integer
#  stripe_id  :string
#  user_id    :integer
#
# Indexes
#
#  index_subscriptions_on_plan_id  (plan_id)
#  index_subscriptions_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (plan_id => plans.id)
#  fk_rails_...  (user_id => users.id)
#
class Subscription < ApplicationRecord
  belongs_to :plan
  belongs_to :merchant, foreign_key: :user_id

  enum status: [:active, :past_due]

  validates :merchant, presence: true, uniqueness: true
  validates :plan, presence: true

  def as_json options={}
    super(options).merge({plan: plan})
  end
end
