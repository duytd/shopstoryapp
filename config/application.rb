require File.expand_path("../boot", __FILE__)

require "rails/all"

Bundler.require(*Rails.groups)

module ShopStory
  class Application < Rails::Application
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

    config.assets.paths << Rails.root.join("vendor", "assets", "bower_components", "fonts")
    config.assets.precompile << /\.(?:png|gif|jpg|svg|eot|woff|ttf)$/

    config.autoload_paths << Rails.root.join("lib")

    config.react.server_renderer = React::ServerRendering::SprocketsRenderer
    config.react.server_renderer_options = {
      files: ["react.js", "merchant/components.js"],
      replay_console: true,
    }
  end
end
