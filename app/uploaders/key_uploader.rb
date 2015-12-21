# encoding: utf-8
class KeyUploader < CarrierWave::Uploader::Base

  storage :file

  def store_dir
    "#{Rails.root}/keys/#{model.shop.subdomain.to_s.underscore}"
  end
end
