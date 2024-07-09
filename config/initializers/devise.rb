require File.expand_path("lib/omniauth/strategies/doindie", Rails.root)

Devise.setup do |config|
  config.mailer_sender = "admin@singularcart.com"
  require "devise/orm/active_record"
  config.secret_key = ENV["SECRET_KEY_BASE"]
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]

  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 10
  config.reconfirmable = false

  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 8..72
  config.reset_password_within = 6.hours
  config.scoped_views = true

  config.http_authenticatable_on_xhr = false
  config.navigational_formats = ["*/*", :html, :json]
  config.omniauth :doindie, ENV["DOINDIE_OAUTH_ID"], ENV["DOINDIE_OAUTH_SECRET"]
  config.omniauth_path_prefix = "/auth"
  config.responder.error_status = :unprocessable_entity
end
