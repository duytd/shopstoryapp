class Merchant::EmailTemplatesController < Merchant::BaseController
  load_and_authorize_resource

  def index
    @email_template = EmailTemplate.first

    @props = {
      email_templates: EmailTemplate.all,
      data: @email_template,
      url: merchant_email_template_path(@email_template),
      reset_url: edit_merchant_email_template_path(@email_template, reset: true),
      preview_url: preview_merchant_email_templates_path
    }
  end

  def edit
    if params[:reset]
      reset
    else
      normal_edit
    end
  end

  def update
    if @email_template.update email_template_params
      render json: @email_template, status: :ok
    else
      render json: @email_template.errors, status: :unprocessable_entity
    end
  end

  def preview
    content = params[:content]
    random_customer = FakerGenerator.random_customer
    random_shop = FakerGenerator.random_shop

    @props = {
      'customer' => random_customer,
      'shop' => random_shop
    }

    data = liquidize content, @props

    render json: {data: data}, status: :ok
  end

  private
  def normal_edit
    @props = {
      data: @email_template,
      url: merchant_email_template_path(@email_template),
      reset_url: edit_merchant_email_template_path(@email_template, reset: true)
    }

    render json: @props, status: :ok
  end

  def reset
    content = @email_template.reset_content
    render json: {data: content, status: :ok}
  end

  def email_template_params
    params.require(:email_template).permit :content
  end
end
