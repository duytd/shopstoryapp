KakaoShopstory.configure do |config|
  config.parent_klass = ::Customer::BaseController
  config.thrift_server = "http://localhost:9091"
end
