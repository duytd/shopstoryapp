module Api
  module V1
    class BaseController < ApplicationController
      include Api::V1::BaseHelper
      protect_from_forgery with: :null_session
      skip_before_filter  :verify_authenticity_token

      before_action :authenticate!
      respond_to :json

      protected
      def authenticate!
        api_key = request.headers["X-Api-Key"]

        unless current_shop.api_key == api_key
          head status: :unauthorized
          return false
        end
      end
    end
  end
end
