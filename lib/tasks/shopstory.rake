namespace :shopstory do
  task setup: :environment do
    Rake::Task["theme:generate_themes"].invoke
    Rake::Task["plan:generate_plans"].invoke
  end
end
