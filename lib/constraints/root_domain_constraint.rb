class Constraints::RootDomainConstraint
  def self.matches? request
    subdomains = %w{ www }
    (request.domain == Settings.app.domain && request.subdomain.empty?) ||
    (request.domain == Settings.app.domain && subdomains.include?(request.subdomain))
  end
end
