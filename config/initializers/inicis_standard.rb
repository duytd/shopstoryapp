Inicis::Standard::Rails.configure do |config|
  config.parent_klass = ::Customer::BaseController
  config.thrift_server = "http://localhost:9090"
  config.crypto_key = ENV["INICIS_CRYPTO_KEY"]
  config.crypto_iv = ENV["INICIS_CRYPTO_IV"]
end
