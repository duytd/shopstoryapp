require File.expand_path("../boot", __FILE__)

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you"ve limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ShopStory
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = "Central Time (US & Canada)"
    config.active_record.raise_in_transactional_callbacks = true

    config.generators do |g|
      g.stylesheets = false
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

    config.assets.paths << Rails.root.join("vendor", "assets", "bower_components", "fonts", "node_modules")
    config.autoload_paths << Rails.root.join("lib")

    config.react.server_renderer_options = {
      files: ["react.js", "merchant/components.js"],
      replay_console: true,
    }
  end
end
