Inicis::Standard::Rails.configure do |config|
  config.parent_klass = ::Customer::BaseController
  config.thrift_server = "http://localhost:9090"
end
