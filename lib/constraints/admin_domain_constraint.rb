class Constraints::AdminDomainConstraint
  def self.matches? request
    request.domain == Settings.app.domain && request.subdomain == "admin"
  end
end
