require "apartment/elevators/generic"

class CustomElevator < Apartment::Elevators::Generic
  def call(*args)
    begin
      super
    rescue Apartment::TenantNotFound
      raise ActionController::RoutingError.new("Not Found")
    end
  end

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
    subdomain = parse_subdomain host

    if excluded_scope?(subdomain)
      return nil
    end

    subdomain
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

  def parse_subdomain host
    subdomain = nil

    Settings.app.domains.each do |domain|
      if host.include?(domain)
        subdomain = host.split('.')[0..-3]
      end
    end

    raise ActionController::RoutingError.new("Not Found") if subdomain.nil? || subdomain.size > 1
    subdomain[0]
  end
end
