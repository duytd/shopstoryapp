require File.expand_path("../boot", __FILE__)

require "rails/all"
require "csv"

Bundler.require(*Rails.groups)

module React
  module ServerRendering
    class SprocketsRenderer
      attr_reader :components

      def initialize(options={})
        @replay_console = options.fetch(:replay_console, true)
        filenames = options[:files]
        js_code = "var document = document || this;"
        js_code << CONSOLE_POLYFILL.dup

        filenames.each do |filename|
          js_code << asset_container.find_asset(filename)
        end

        @components = asset_container.find_asset "customer/components.js"
        super(options.merge(code: js_code))
      end

      def render component_name, props, prerender_options
        react_render_method = if prerender_options == :static
            "renderToStaticMarkup"
          else
            "renderToString"
          end

        if !props.is_a?(String)
          props = props.to_json
        end

        super(component_name, props, prerender_options.merge({render_function: react_render_method}))
      end
    end
  end
end

class TemplateRenderer < React::ServerRendering::SprocketsRenderer
  def before_render component_name, props, prerender_options
    theme = prerender_options[:theme]
    currency = prerender_options[:currency]

    if Rails.env.development?
      js_code = asset_container.find_asset("customer/themes/#{theme}/templates/template.js")
    else
      js_code = prerender_options[:locale]
    end

    js_code << "I18n.locale = '#{I18n.locale.to_s}'; I18n.currency = '#{currency}';"

    if Rails.env.development?
      js_code << asset_container.find_asset("customer/themes/#{theme}/locales/all.js")
    else
      js_code << prerender_options[:template]

    end

    js_code << self.components

    js_code
  end
end

module ShopStory
  class Application < Rails::Application
    config.active_record.raise_in_transactional_callbacks = true
    config.action_controller.include_all_helpers = false

    config.time_zone = "Seoul"
    config.active_record.default_timezone = :local

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

    config.autoload_paths += Dir["#{config.root}/lib/**/"]
    config.autoload_paths << Rails.root.join("app", "presenters")

    config.react.server_renderer = TemplateRenderer
    config.react.server_renderer_options = {
      files: ["react-server.js", "customer/vendor.js"],
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

    config.exceptions_app = self.routes
    config.cache_store = :dalli_store, nil, {namespace: "shopstory", compress: true}
 end
end
