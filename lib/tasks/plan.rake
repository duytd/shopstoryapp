namespace :plan do
  desc "Generate default plans for ShopStory"
  task generate_plans: :environment do
    Plan.create([
      {
        name: "trial",
        default: true
      },
      {
        name: "starter"
      },
      {
        name: "pro"
      },
      {
        name: "unlimited"
      }
    ])
  end
end
