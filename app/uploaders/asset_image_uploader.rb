# encoding: utf-8

class AssetImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    "uploads/#{Apartment::Tenant.current}/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path("fallback/product/" + [version_name, "default.jpg"].compact.join('_'))
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
