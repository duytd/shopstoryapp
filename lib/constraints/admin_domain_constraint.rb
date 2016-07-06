class Constraints::AdminDomainConstraint
  def self.matches? request
    domain = request.domain 2
    subdomain = request.subdomain 2

    domain == Settings.app.domain && subdomain == "admin"
  end
end
