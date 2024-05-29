# == Schema Information
#
# Table name: email_templates
#
#  id         :integer          not null, primary key
#  content    :text
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class EmailTemplate < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :content, presence: true

  def reset_content
    template_dir = "#{Rails.root}/app/views/customer/template_mailer"

    Dir.glob("#{template_dir}/**/*.liquid") do |file|
      if File.basename(file) == name
        return File.read file
      end
    end

    nil
  end
end
