class Constraints::RootDomainConstraint
  def self.matches? request
    subdomains = %w{ www }
    request.subdomain.empty? || subdomains.include?(request.subdomain)
  end
end
