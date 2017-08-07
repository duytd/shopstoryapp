class Constraints::RootDomainConstraint
  def self.matches? request
    subdomains = Settings.app.root_subdomains
    top_level_domain = request.domain
    top_level_subdomain = request.subdomain
    second_level_domain = request.domain 2
    second_level_subdomain = request.subdomain 2

    (Settings.app.domains.include?(top_level_domain) && top_level_subdomain.blank?) ||
      (Settings.app.domains.include?(top_level_domain) && subdomains.include?(top_level_subdomain)) ||
      (Settings.app.domains.include?(second_level_domain) && second_level_subdomain.blank?) ||
      (Settings.app.domains.include?(second_level_domain) && subdomains.include?(second_level_subdomain))
  end
end
