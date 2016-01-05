require "zip"

class PaymentMethodShop < ActiveRecord::Base
  mount_uploader :key, KeyUploader

  belongs_to :payment_method
  belongs_to :shop
  has_many :payment_method_option_shops
  has_many :payment_method_options, through: :payment_method_option_shops

  validates :payment_method, presence: true
  validates :shop, presence: true

  after_save :unzip_key

  accepts_nested_attributes_for :payment_method_option_shops, reject_if: :all_blank

  def as_json options={}
    super.as_json(options).merge({
      payment_method: payment_method,
      payment_method_option_shops: payment_method_option_shops
    })
  end

  def load_option option_name
    payment_method_option_shops.joins(:payment_method_option)
      .where("payment_method_options.name = ?", option_name).first.value
  end

  private
  def unzip_key
    if key.url
      Zip::File.open(key.url) do |zip_file|
        zip_file.each do |f|
          f_path=File.join(File.dirname(key.url), f.name)
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
end
