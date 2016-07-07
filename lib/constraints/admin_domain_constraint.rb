class Constraints::AdminDomainConstraint
  def self.matches? request
    top_level_domain = request.domain
    top_level_subdomain = request.subdomain
    second_level_domain = request.domain 2
    second_level_subdomain = request.subdomain 2

    (Settings.app.domains.include?(top_level_domain) && top_level_subdomain == "admin") ||
      (Settings.app.domains.include?(second_level_domain) && second_level_subdomain == "admin")
  end
end
