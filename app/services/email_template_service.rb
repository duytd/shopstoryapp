class EmailTemplateService
  TEMPLATE_PATH = "#{Rails.root}/app/views/customer/template_mailer"

  def initialize params
    @shop = params[:shop]
  end

  def create_initial_data
    Dir.glob("#{TEMPLATE_PATH}/**/*.liquid") do |file|
      file_name = File.basename file
      file_content = File.read file
      EmailTemplate.create name: file_name, content: file_content
    end
  end
end
