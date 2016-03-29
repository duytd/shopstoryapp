# encoding: utf-8

class LogoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path("logo/fallback/" + [version_name, "default.jpg"].compact.join('_'))
  end

  version :thumb do
    process resize_to_fit: [200, 200]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end