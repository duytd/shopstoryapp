# == Schema Information
#
# Table name: payment_method_shops
#
#  id                :integer          not null, primary key
#  active            :boolean          default(FALSE)
#  key               :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  payment_method_id :integer
#  shop_id           :integer
#
# Indexes
#
#  index_payment_method_shops_on_payment_method_id  (payment_method_id)
#  index_payment_method_shops_on_shop_id            (shop_id)
#
# Foreign Keys
#
#  fk_rails_...  (payment_method_id => payment_methods.id)
#  fk_rails_...  (shop_id => shops.id)
#
class PaymentMethodShop < ApplicationRecord
  mount_uploader :key, KeyUploader

  belongs_to :payment_method
  belongs_to :shop
  validates_uniqueness_of :payment_method_id, scope: :shop_id
  has_many :payment_method_option_shops, dependent: :destroy
  has_many :payment_method_options, through: :payment_method_option_shops

  validates :payment_method, presence: true
  validates :shop, presence: true
  validates :payment_method_id, uniqueness: {scope: :shop_id}
  validate :necessary_fields_must_be_presented, on: :update
  validates_presence_of :key, if: :active_and_key_required?

  default_scope {order created_at: :asc}
  scope :active, -> {where active: true}

  accepts_nested_attributes_for :payment_method_option_shops, reject_if: :all_blank

  def as_json options={}
    super.as_json(options).merge({
      payment_method: payment_method,
      payment_method_option_shops: payment_method_option_shops
    })
  end

  def load_option option_name
    option = payment_method_option_shops.joins(:payment_method_option)
      .where("payment_method_options.name = ?", option_name)

    if option.size > 0
      return option.first.value
    end

    ""
  end

  private

  def active_and_key_required?
    active_changed? && active? && payment_method.key_required
  end

  def necessary_fields_must_be_presented
    if active_changed? && active?
      payment_method.required_fields.each do |field|
        if load_option(field).blank?
          errors.add :base, "#{field} cannot be blank"
        end
      end
    end
  end
end
