namespace :shopstory do
  task setup: :environment do
    Rake::Task["theme:generate_themes"].invoke
    Rake::Task["inicis:install"].invoke
    Rake::Task["paypal_shopstory:install"].invoke
  end

  task create_admin: :environment do
    admin = Admin.create([
      {
        email: "ddtrinh93@gmail",
        password: "N3vermind",
        password_confirmation: "N3vermind"
      }
    ])
  end
end
