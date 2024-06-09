namespace :routes do
  task generate_js_routes: :environment do
    path = Rails.root.join("app/javascript")

    JsRoutes.generate!(
      "#{path}/src/customer/routes.js", exclude: /^admin_/
    )
    JsRoutes.generate!(
      "#{path}/src/merchant/routes.js", include: /^admin_/
    )
  end
end
