# encoding: utf-8

class MarketingFeatureImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    "uploads/feature/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path("fallback/feature/" + [version_name, "default.jpg"].compact.join('_'))
  end

  version :thumb do
    process resize_to_fit: [600, 400]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
