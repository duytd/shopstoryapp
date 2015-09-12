require "rails_helper"
include Devise::TestHelpers

RSpec.describe Merchant::ProductsController, type: :controller do
  let(:product) {create :product}
  let(:merchant) {create :merchant}
  let(:input_en_name) {"Product English Name"}
  let(:input_ko_name) {"Product Korean Name"}
  let(:input_en_desc) {"Product English Description"}
  let(:input_ko_desc) {"Product Korean Description"}

  before do
    sign_in merchant
    Apartment::Tenant.switch! merchant.subdomain
  end

  describe "#index" do
    let (:product) {create :product}
    let (:other_product) {create :other_product}

    before {get :index}

    it {expect(assigns(:products)).to match_array([other_product, product])}
  end

  describe "#new" do
    before {get :new}
    it {expect(response).to render_template :new}
  end

  describe "#edit" do
    let(:product) {create :product}

    before {get :edit, id: product.id}

    it {expect(assigns(:product)).to eq product}
    it {expect(response).to render_template :edit}
  end

  describe "#destroy" do
    let(:product) {create :product}
    before {delete :destroy, id: product.id}

    it {expect(response.body).to eq({status: :success}.to_json)}
  end

  describe "#create" do
    subject {post :create, product: {name_en: input_en_name,
      name_ko: input_ko_name, description_en: input_en_desc, description_ko: input_ko_desc,
      price: 9.99 }}

    before do
      allow(Product).to receive(:new).and_return product
    end

    context "when the product saves successfully" do
      before do
        allow(product).to receive(:save).and_return true
      end

      it {expect(subject.body).to eq({data: product, status: :success}.to_json)}
    end

    context "when the product fails to save" do
      before do
        allow(product).to receive(:save).and_return false
      end

      it {expect(JSON.parse(subject.body)["status"]).to eq "unprocessed_entity"}
    end
  end

  describe "#update" do
    subject {put :update, id: product_id, product: {name_en: input_en_name,
      name_ko: input_ko_name, description_en: input_en_desc, description_ko: input_ko_desc,
      price: 9.99 }}
    let (:product_id) {double "product_id"}

    before do
      allow(Product).to receive(:find).and_return product
    end

    context "when the product updates successfully" do
      before do
        allow(product).to receive(:update).and_return true
      end

      it {expect(subject.body).to eq({data: product, status: :success}.to_json)}
    end

    context "when the product fails to update" do
      before do
        allow(product).to receive(:update).and_return false
      end

      it {expect(JSON.parse(subject.body)["status"]).to eq "unprocessed_entity"}
    end
  end
end
