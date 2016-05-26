module Api
  module V1
    class SessionsController < Devise::SessionsController
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
