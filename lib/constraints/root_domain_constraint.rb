class Constraints::RootDomainConstraint
  def self.matches? request
    subdomains = %w{ www }
    domain = request.domain 2
    subdomain = request.subdomain 2

    (domain == Settings.app.domain && subdomain.blank?) ||
    (domain == Settings.app.domain && subdomains.include?(subdomain))
  end
end
