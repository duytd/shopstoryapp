module Api
  module V1
    class BaseController < ApplicationController
      include Api::V1::BaseHelper
      before_action :authenticate_client!

      protected
      def authenticate_client!
        unless current_shop.client_id == params[:client_id] &&
          current_shop.api_key == request.headers["HTTP_API_KEY"]
          render json: {message: "access_denied"}, status: :unauthorized
        end
      end
    end
  end
end
