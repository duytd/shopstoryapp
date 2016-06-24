require "rails_helper"

RSpec.describe Shop, type: :model do
  let(:shop) {build :shop}

  context "when subdomain contains special characters" do
    before do
      shop.subdomain = "subdomain@*_/"
    end

    it {expect(shop).to have(1).errors_on(:subdomain)}
  end

  context "when subdomain contains white space" do
    before do
      shop.subdomain = "sub domain"
    end

    it {expect(shop).to have(1).errors_on(:subdomain)}
  end

  describe "#strip_white_space" do
    before do
      shop.domain = " domain "
      shop.save
    end

    it {expect(shop.domain).to eq("domain")}
  end

  context "associations" do
    it {expect(shop.theme.default).to eq true}
  end
end
