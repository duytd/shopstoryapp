# encoding: utf-8

class LogoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    "uploads/#{Apartment::Tenant.current}/logo/"
  end

  def default_url
    ActionController::Base.helpers.asset_path("fallback/logo/" + [version_name, "default.svg"].compact.join('_'))
  end

  version :thumb do
    process resize_to_fit: [200, 200]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
