module Api
  module V1
    class SessionsController < Devise::SessionsController
      protect_from_forgery with: :null_session
      skip_before_filter  :verify_authenticity_token

      def create
        @customer = Customer.find_by_access_token params[:access_token]

        unless @customer.nil?
          sign_in :customer, @customer
          render json: {session_id: session[:session_id]}, status: :ok
        else
          render json: nil, status: :unauthorized
        end
      end
    end
  end
end
