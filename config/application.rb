require File.expand_path("../boot", __FILE__)

require "rails/all"

Bundler.require(*Rails.groups)

module ShopStory
  class Application < Rails::Application
    config.active_record.raise_in_transactional_callbacks = true
    config.action_controller.include_all_helpers = false

    config.generators do |g|
      g.javascripts = false
      g.helper      = false

      g.test_framework :rspec,
        fixtures: true,
        view_specs: false,
        helper_specs: false,
        routing_specs: false,
        controller_specs: true,
        request_specs: false
      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

    config.assets.paths << Rails.root.join("vendor", "assets", "bower_components", "fonts")
    config.assets.precompile << /\.(?:png|gif|jpg|svg|eot|woff|ttf)$/

    config.autoload_paths << Rails.root.join("lib")
    config.autoload_paths << Rails.root.join("app", "presenters")

    config.react.server_renderer = React::ServerRendering::SprocketsRenderer
    config.react.server_renderer_options = {
      files: ["react-server.js", "merchant/components.js"],
      replay_console: true,
    }

    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.perform_deliveries = true
    config.action_mailer.default_url_options = { host: ENV["APP_DOMAIN"] }
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      address: ENV["SMTP_SERVER"],
      openssl_verify_mode: OpenSSL::SSL::VERIFY_NONE,
      port: ENV["SMTP_PORT"],
      authentication: "plain",
      enable_starttls_auto: true,
      user_name: ENV["SMTP_USER"],
      password: ENV["SMTP_PWD"]
    }
 end
end
