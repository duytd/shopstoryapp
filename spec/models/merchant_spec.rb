require "rails_helper"

RSpec.describe Merchant, type: :model do
  let(:merchant) {build :merchant}

  it "should generate subdomain after create" do
    merchant.email = "example@shopstoryapp.com"
    merchant.save
    expect(merchant.subdomain).to eq "example"
  end

  describe "#next_setup_step!" do
    it "should change setup step to next step if not last step" do
      merchant.setup_step = Merchant.setup_steps[:provide_business_info]
      merchant.save
      merchant.next_setup_step!
      expect(merchant.setup_step).to eq("generate_sample_data")
    end

    it "should not change setup step if last step" do
      merchant.setup_step = Merchant.setup_steps[:done]
      merchant.next_setup_step!
      merchant.save
      expect(merchant.setup_step).to eq("done")
    end
  end
end
