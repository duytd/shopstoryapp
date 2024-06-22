# == Schema Information
#
# Table name: public.plans
#
#  id         :integer          not null, primary key
#  features   :text
#  highlight  :boolean          default(FALSE)
#  interval   :string
#  name       :string
#  position   :integer
#  price      :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  stripe_id  :string
#
class Plan < ApplicationRecord
  has_many :subscriptions, dependent: :nullify
  has_many :shop, through: :subscriptions

  before_create :generate_stripe_id

  validates :name, presence: true, uniqueness: true
  validates :price, presence: true, numericality: true
  validates :position, numericality: true, allow_blank: true

  after_commit :enqueue_create_stripe_plan, on: :create
  after_commit :enqueue_update_stripe_plan, on: :update
  before_destroy :enqueue_destroy_stripe_plan

  default_scope {order position: :asc}

  def self.interval_options
    %w{ month year }
  end

  def self.create_stripe_plan stripe_id
    plan = Plan.find_by stripe_id: stripe_id

    Stripe::Plan.create(
      amount: plan.price.to_i,
      interval: plan.interval,
      name: plan.name,
      currency: "usd",
      trial_plan: nil,
      id: plan.stripe_id
    )
  end

  def self.update_stripe_plan stripe_id
    plan = Plan.find_by stripe_id: stripe_id

    p = Stripe::Plan.retrieve plan.stripe_id
    p.name = plan.name
    p.save
  end

  def self.destroy_stripe_plan stripe_id
    p = Stripe::Plan.retrieve stripe_id
    p.delete
  end

  def as_json options={}
    super(options).merge({parsed_features: parsed_features})
  end

  private

  def enqueue_create_stripe_plan
    # PlanWorker.perform_async stripe_id, :create
  end

  def enqueue_update_stripe_plan
    # PlanWorker.perform_async stripe_id, :update
  end

  def enqueue_destroy_stripe_plan
    # PlanWorker.perform_async stripe_id, :destroy
  end

  def generate_stripe_id
    self.stripe_id = SecureRandom.uuid
  end

  def parsed_features
    features.scan(/\{(.*?)\}/).map{|x| x[0].split("|")}
  end
end
