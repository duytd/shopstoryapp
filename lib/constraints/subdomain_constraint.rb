class Constraints::SubdomainConstraint
  def self.matches? request
    excluded_subdomains = %w{ www admin }
    request.subdomain.present? && !excluded_subdomains.include?(request.subdomain)
  end
end
