namespace :routes do
  task generate_js_routes: :environment do
    path = Rails.root.join("app/javascript")

    JsRoutes.generate!(
      "#{path}/src/customer/routes.js"
    )
    JsRoutes.generate!(
      "#{path}/src/merchant/routes.js"
    )
  end
end
