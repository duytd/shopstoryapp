class Merchant::SubscriptionsController < Merchant::BaseController
  protect_from_forgery with: :exception, except: [:create, :update]
  before_action :load_subscription, only: [:update]

  def index
    @plans = Plan.all
    @props = {
      plans: @plans,
      user: current_merchant,
      current_subscription: current_merchant.subscription,
      stripe_key: Rails.configuration.stripe[:publishable_key]
    }
  end

  def create
    stripe_plan = Stripe::Plan.retrieve params[:plan_id]
    stripe_customer = Stripe::Customer.create(
      description: "Merchant ##{current_merchant.id}",
      source: params[:stripeToken],
      email: current_merchant.email
    )
    current_merchant.update_attribute :stripe_id, stripe_customer["id"]
    stripe_subscription = stripe_customer.subscriptions.create plan: stripe_plan.id

    plan = Plan.find_by stripe_id: params[:plan_id]
    current_merchant.create_subscription(
      plan_id: plan.id,
      start_at: stripe_subscription["current_period_start"],
      end_at: stripe_subscription["current_period_end"],
      status: Subscription.statuses[stripe_subscription["status"]],
      stripe_id: stripe_subscription["id"]
    )

    redirect_to merchant_root_path
  end

  def update
    plan = Plan.find_by stripe_id: params[:plan_id]

    stripe_customer = Stripe::Customer.retrieve current_merchant.stripe_id
    stripe_subscription = stripe_customer.subscriptions.retrieve @subscription.stripe_id
    stripe_subscription.plan = plan.stripe_id
    response = stripe_subscription.save

    @subscription.update_attributes({
      plan_id: plan.id,
      status: Subscription.statuses[response["status"]]
    })

    redirect_to merchant_root_path
  end

  def destroy
    stripe_customer = Stripe::Customer.retrieve current_merchant.stripe_id
    response = stripe_customer.subscriptions.retrieve(@subscription.id).delete

    @subscription.update_attributes({
      status: Subscription.statuses[response["status"]]
    })
  end

  def load_subscription
    @subscription = Subscription.find params[:id]
  end
end
