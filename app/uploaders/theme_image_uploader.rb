# encoding: utf-8

class ThemeImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    "uploads/theme/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path("fallback/theme/" + [version_name, "default.jpg"].compact.join('_'))
  end

  version :thumb do
    process resize_to_fit: [500, 500]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
