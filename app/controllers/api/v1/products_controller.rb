module Api
  module V1
    class ProductsController < BaseController
      def index
        respond_with Product.latest.available.page params[:page]
      end
    end
  end
end
