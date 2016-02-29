class Constraints::CustomerDomainConstraint
  def self.matches? request
    domain_present?(request.host) || subdomain_present?(request.subdomain)
  end

  private
  def self.domain_present? domain
    Shop.find_by_domain(domain).present?
  end

  def self.subdomain_present? subdomain
    excluded_subdomains = %w{ www admin }
    subdomain.present? && !excluded_subdomains.include?(subdomain)
  end
end
