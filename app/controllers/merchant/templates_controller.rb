class Merchant::TemplatesController < Merchant::BaseController
  load_and_authorize_resource
  before_action :load_theme_bundle, only: :update

  def edit
    if params[:reset]
      reset
    else
      normal_edit
    end
  end

  def update
    old_content = @template.content

    if @template.update template_params
      Template.update_bundle(@theme_bundle) if old_content != @template.content
      render json: @template, status: :ok
    else
      render json: @template.errors, status: :unprocessable_entity
    end
  end

  private
  def normal_edit
    @props = {
      data: @template,
      url: merchant_template_path(@template),
      reset_url: edit_merchant_template_path(@template, reset: true)
    }

    render json: @props, status: :ok
  end

  def reset
    content = @template.theme.read_file @template.path
    render json: {data: content, status: :ok}
  end

  def template_params
    params.require(:asset).permit :content
  end

  def load_theme_bundle
    @theme_bundle = @current_shop.theme_bundles.with_theme @current_shop.theme_id
  end
end
