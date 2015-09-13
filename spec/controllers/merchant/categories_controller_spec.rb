require "rails_helper"
include Devise::TestHelpers

RSpec.describe Merchant::CategoriesController, type: :controller do
  let(:category) {create :category}
  let(:merchant) {create :merchant}
  let(:input_en_name) {"Category English Name"}
  let(:input_ko_name) {"Category Korean Name"}

  before do
    sign_in merchant
    Apartment::Tenant.switch! merchant.subdomain
  end

  describe "#index" do
    let (:category) {create :category}
    let (:other_category) {create :other_category}

    before {get :index}

    it {expect(assigns(:categories)).to match_array([category, other_category])}
  end

  describe "#new" do
    before {get :new}
    it {expect(response).to render_template :new}
  end

  describe "#edit" do
    let(:category) {create :category}

    before {get :edit, id: category.id}

    it {expect(assigns(:category)).to eq category}
    it {expect(response).to render_template :edit}
  end

  describe "#destroy" do
    let(:category) {create :category}
    before {delete :destroy, id: category.id}

    it {expect(response.body).to eq({status: :success}.to_json)}
  end

  describe "#create" do
    subject {post :create, category: {name_ko: input_ko_name, name_en: input_en_name}}

    before do
      allow(Category).to receive(:new).and_return(category)
    end

    context "when the category saves successfully" do
      before do
        allow(category).to receive(:save).and_return(true)
      end

      it {expect(subject.body).to eq({data: category, status: :success}.to_json)}
    end

    context "when the category fails to save" do
      before do
        allow(category).to receive(:save).and_return(false)
      end

      it {expect(JSON.parse(subject.body)["status"]).to eq "unprocessed_entity"}
    end
  end

  describe "#update" do
    subject {put :update, id: category_id, category: {name_en: input_en_name,
                                                      name_ko: input_ko_name}}
    let (:category_id) {double "category_id"}

    before do
      allow(Category).to receive(:find).and_return(category)
    end

    context "when the category updates successfully" do
      before do
        allow(category).to receive(:update).and_return(true)
      end

      it {expect(subject.body).to eq({data: category, status: :success}.to_json)}
    end

    context "when the category fails to update" do
      before do
        allow(category).to receive(:update).and_return(false)
      end

      it {expect(JSON.parse(subject.body)["status"]).to eq "unprocessed_entity"}
    end
  end
end
