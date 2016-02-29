module Api
  module V1
    module BaseHelper
      def current_shop
        subdomain = Apartment::Tenant.current
        @current_shop ||= Shop.find_by_subdomain subdomain
      end
    end
  end
end
