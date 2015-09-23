require "rails_helper"

RSpec.describe Shop, type: :model do
  let(:shop) {create :shop}
  let(:theme) {create :default_theme}
  let(:plan) {create :default_plan}

  describe "associations" do
    it {expect have_many :discounts}
    it {expect have_many :pages}
    it {expect have_many :menus}

    context "should belongs to correct theme" do
      before {shop.theme_id = theme.id}
      it {expect(shop.theme).to eq theme}
    end

    context "should belongs to correct plan" do
      before {shop.plan_id = plan.id}
      it {expect(shop.plan).to eq plan}
    end
  end

  context "assigns defaults before validation" do
    it {is_expected.to callback(:load_defaults).before(:validation)}
  end
end
