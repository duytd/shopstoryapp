class PlanWorker
  # include Sidekiq::Worker
  # sidekiq_options retry: 5, dead: false

  def perform stripe_id, action
    Plan.send "#{action}_stripe_plan", stripe_id
  end
end
