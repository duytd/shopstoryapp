namespace :fix do
  task update_menu_types: :environment do
    Shop.all.each do |shop|
      Apartment::Tenant.switch shop.subdomain
      MenuItem.where(type: "Menu::Category").update_all type: "Menu::CategoryMenu"
      MenuItem.where(type: "Menu::CategoryAll").update_all type: "Menu::CategoryIndexMenu"
      MenuItem.where(type: "Menu::Product").update_all type: "Menu::ProductMenu"
      MenuItem.where(type: "Menu::ProductAll").update_all type: "Menu::ProductIndexMenu"
      MenuItem.where(type: "Menu::Url").update_all type: "Menu::UrlMenu"
      MenuItem.where(type: "Menu::Home").update_all type: "Menu::HomeMenu"
      MenuItem.where(type: "Menu::Page").update_all type: "Menu::CustomPageMenu"
    end
  end

  task update_subscription_time: :environment do
    Subscription.all.each do |subscription|
      customer = subscription.merchant
      stripe_customer = Stripe::Customer.retrieve customer.stripe_id
      stripe_subscription = stripe_customer.subscriptions.retrieve subscription.stripe_id
      subscription.start_at = Time.at stripe_subscription["current_period_start"]
      subscription.end_at = Time.at stripe_subscription["current_period_end"]
      subscription.save!
    end
  end

  task update_templates: :environment do
    Shop.all.each do |shop|
      shop.theme.setup shop, {javascript: false, stylesheet: false, locale: false}
    end
  end
end
