require "rails_helper"

RSpec.describe Merchant, type: :model do
  it {should validate_presence_of :password}
  it {should allow_value("example@shopstoryapp.com").for(:email)}
  it {should_not allow_value("example@shopstoryapp").for(:email)}  

  context "create shop after registration" do
    it {is_expected.to callback(:create_merchant_shop).after(:create)}
  end

  context "create tenant after registration" do
    it {is_expected.to callback(:create_tenant).after(:create)}
  end
end
