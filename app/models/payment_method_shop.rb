require "zip"

class PaymentMethodShop < ActiveRecord::Base
  mount_uploader :key, KeyUploader

  belongs_to :payment_method
  belongs_to :shop
  has_many :payment_method_option_shops
  has_many :payment_method_options, through: :payment_method_option_shops

  validates :payment_method, presence: true
  validates :shop, presence: true
  validates :payment_method_id, uniqueness: {scope: :shop_id}
  validate :necessary_fields_must_be_presented, on: :update
  #validates :key, presence: true, if: :active_and_key_required?

  scope :active, -> {where active: true}

  after_save :unzip_key

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
  def unzip_key
    if key.url && key_changed?
      Zip::File.open(key.url) do |zip_file|
        zip_file.each do |f|
          f_path = File.join(File.dirname(key.url), f.name)
          FileUtils.mkdir_p File.dirname(f_path)
          zip_file.extract(f, f_path){true}
        end
      end
      remove_zip
    end
  end

  def remove_zip
    FileUtils.rm key.url
  end

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
