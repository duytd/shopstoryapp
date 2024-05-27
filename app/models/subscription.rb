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
