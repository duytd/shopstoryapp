module DomainHelper
  def matched_root_domain?
    Settings.app.domains.include?(request.domain) || Settings.app.domains.include?(request.domain(2))
  end
end
