require "apartment/elevators/generic"

class CustomElevator < Apartment::Elevators::Generic
    def self.excluded_subdomains
      @excluded_subdomains ||= []
    end

    def self.excluded_subdomains=(arg)
      @excluded_subdomains = arg
    end

    def parse_tenant_name request
      host = request.host
      shop = Shop.find_by domain: [host, alternative_domain(host)]

      tenant = if shop
        shop.subdomain
      else
        tenant_from_subdomain host
      end

      tenant.presence
    end

    protected
    def tenant_from_subdomain host
      request_subdomain = subdomain host

      if excluded_scope?(request_subdomain)
        return nil
      end

      request_subdomain
    end

    def excluded_scope? subdomain
      self.class.excluded_subdomains.include? subdomain
    end

    def alternative_domain domain
      if domain.include? "www"
        domain.gsub("www.", "").strip
      else
        "www.#{domain}"
      end
    end

    def subdomain(host)
      subdomains(host).first
    end

    def subdomains(host)
      return [] unless named_host?(host)

      host.split('.')[0..-(Apartment.tld_length + 2)]
    end

    def named_host?(host)
      !(host.nil? || /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.match(host))
    end
end
