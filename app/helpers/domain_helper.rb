module DomainHelper
  def matched_root_domain?
    request.domain(2) == Settings.app.domain
  end
end
