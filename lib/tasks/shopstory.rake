namespace :shopstory do
  task setup: :environment do
    Rake::Task["theme:generate_themes"].invoke
    Rake::Task["plan:generate_plans"].invoke
    Rake::Task["inicis:install"].invoke
    Rake::Task["paypal_shopstory:install"].invoke
  end
end
