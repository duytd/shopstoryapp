require "omniauth-oauth2"

module Doindie
  module Strategies
    class Doindie < OmniAuth::Strategies::OAuth2
      option :name, "doindie"

      option :client_options, {
        site: ENV["DOINDIE_URL"],
        authorize_path: "/oauth/authorize"
      }

      uid{ raw_info["id"] }

      info do
        {
          name: raw_info["username"],
          email: raw_info["email"]
        }
      end

      extra do
        {
          "raw_info" => raw_info
        }
      end

      def raw_info
        @raw_info ||= access_token.get("/me").parsed
      end
    end
  end
end
