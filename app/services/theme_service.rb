class ThemeService
  def initialize params
    @theme = params[:theme]
    @bundle = params[:bundle]
    @options = params[:options]
    @asset_service = AssetService.new({theme: @theme, subdomain: @options[:subdomain]})
    @template_service = TemplateService.new({theme: @theme, subdomain: @options[:subdomain]})
  end

  def create_bundle
    @bundle.javascript = @asset_service.get_compiled_code "javascript"
    @bundle.stylesheet = @asset_service.get_compiled_code "stylesheet"
    @bundle.locale = @asset_service.get_compiled_code "locale"
    @bundle.template = @template_service.get_compiled_code "template"
    @bundle.save!
  end

  def precompile
    Apartment::Tenant.reset
    @asset_service.create_bundle("javascript") unless @options[:javascript] == false
    @asset_service.create_bundle("stylesheet") unless @options[:stylesheet] == false
    @asset_service.create_bundle("locale") unless @options[:locale] == false
    @template_service.create_bundle unless @options[:template] == false
  end
end
