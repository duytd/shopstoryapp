require "rails_helper"

RSpec.describe Merchants::CreateNewMerchant do
  context "when merchant email or password is not valid" do
    it "returns errors" do
      merchant = build(:merchant, shop_name: "Foo", email: "invalid_email", password: "invalid")
      outcome = described_class.run(merchant: merchant)
      expect(outcome).not_to be_valid

      expect(outcome.errors.full_messages).to include("Email must be a valid address (E.g: example@shopstory.xyz)")
      expect(outcome.errors.full_messages).to include("Password must be at least 8 characters")
    end
  end

  context "when shop name is not valid" do
    it "returns errors" do
      merchant = build(:merchant, shop_name: "###")
      outcome = described_class.run(merchant: merchant)
      expect(outcome).not_to be_valid

      expect(outcome.errors.full_messages).to include("Shop name is not valid")
    end
  end

  context "when all inputs are valid" do
    it "creates merchant and initial data" do
      merchant = build(:merchant, shop_name: "shopstory")

      outcome = described_class.run(merchant: merchant)
      expect(outcome).to be_valid

      Apartment::Tenant.switch("shopstory") do
        expect(CustomPage.count).to eq(2)
        expect(PaymentMethod.count).to eq(2)
        expect(EmailTemplate.count).to eq(1)
        expect(ThemeBundle.count).to eq(1)
      end
    end
  end
end
