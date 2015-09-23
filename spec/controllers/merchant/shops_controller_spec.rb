require "rails_helper"
include Devise::TestHelpers

RSpec.describe Merchant::ShopsController, type: :controller do
  let(:merchant) {create :merchant}
  let(:shop) {merchant.shop}
  let(:theme) {create :default_theme}
  let(:plan) {create :default_plan}
  let(:input_name) {"Shop Name"}

  before do
    allow(Theme).to receive(:default).and_return(theme)
    allow(Plan).to receive(:default).and_return(plan)
    sign_in merchant
    Apartment::Tenant.switch! merchant.subdomain
  end

  describe "#edit" do
    before {get :edit, id: shop.id}

    it {expect(assigns(:shop)).to eq shop}
    it {expect(response).to render_template :edit}
  end

  describe "#update" do
    subject {put :update, id: shop_id, shop: {name: input_name}}
    let (:shop_id) {double "shop_id"}

    before do
      allow(Shop).to receive(:find).and_return shop
    end

    context "when the shop updates successfully" do
      before do
        allow(shop).to receive(:update).and_return true
      end

      it {expect(subject.body).to eq({data: shop, status: :success}.to_json)}
    end

    context "when the shop fails to update" do
      before do
        allow(shop).to receive(:update).and_return false
      end

      it {expect(JSON.parse(subject.body)["status"]).to eq "unprocessed_entity"}
    end
  end
end
