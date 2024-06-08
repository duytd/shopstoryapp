# == Schema Information
#
# Table name: payment_methods
#
#  id                 :integer          not null, primary key
#  active             :boolean          default(FALSE)
#  description        :text
#  desktop_submethods :string
#  image              :string
#  key_required       :boolean
#  mobile_submethods  :string
#  name               :string
#  type               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class PaymentMethod < ApplicationRecord
  mount_uploader :image, PaymentMethodImageUploader
  validates :name, presence: true, uniqueness: true

  has_many :payment_method_options, dependent: :destroy
  has_many :payments, dependent: :nullify
  has_many :orders, through: :payments

  def self.stripe
    find(name: "paypal")
  end

  def as_json options={}
    super.as_json(options).merge({
      payment_method_options: payment_method_options,
      type: type.underscore
    })
  end

  def load_option option_name
    options = payment_method_options.where(name: option_name)

    if options.size > 0
      return options.first.value
    end

    ""
  end

  def total_sale
    orders.success.count
  end
end
