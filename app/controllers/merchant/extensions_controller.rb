class Merchant::ExtensionsController < Merchant::BaseController
  load_and_authorize_resource

  before_action :load_installed_ids

  def index
    @extensions = Extension.all
  end

  def show
  end

  private
  def load_installed_ids
    @installed_ids = current_shop.extension_ids
  end
end
