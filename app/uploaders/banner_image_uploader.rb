# encoding: utf-8

class BannerImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path("fallback/banner/" + [version_name, "default.jpg"].compact.join('_'))
  end

  version :medium do
    process resize_to_fit: [1200, 300]
  end

  version :thumb do
    process resize_to_fit: [400, 100]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
