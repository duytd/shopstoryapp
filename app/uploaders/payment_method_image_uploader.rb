# encoding: utf-8

class PaymentMethodImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    "uploads/paymethod/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path("fallback/paymethod/" + [version_name, "default.jpg"].compact.join('_'))
  end

  version :thumb do
    process resize_to_fit: [300, 100]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
