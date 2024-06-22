class ThemeService
  def initialize params
    @theme = params[:theme]
    @bundle = params[:bundle]
    @options = params[:options]
    @asset_service = AssetService.new({theme: @theme, subdomain: @options[:subdomain]})
    @template_service = TemplateService.new({theme: @theme, subdomain: @options[:subdomain]})
  end

  def create_bundle
    @bundle.javascript = @asset_service.get_compiled_code "javascript" unless @options[:javascript] == false
    @bundle.stylesheet = @asset_service.get_compiled_code "stylesheet" unless @options[:stylesheet] == false
    @bundle.locale = @asset_service.get_compiled_code "locale" unless @options[:locale] == false
    @bundle.template = @template_service.get_compiled_code "template" unless @options[:template] == false
    @bundle.save!
  end

  def precompile
    @asset_service.create_bundle("javascript")
    @asset_service.create_bundle("stylesheet")
    @asset_service.create_bundle("locale")
    @template_service.create_bundle
  end
end
