# encoding: utf-8

class ThemeImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path("fallback/theme/" + [version_name, "default.png"].compact.join('_'))
  end

  version :thumb do
    process resize_to_fit: [400, 600]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
