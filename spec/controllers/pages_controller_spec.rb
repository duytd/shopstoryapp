require "rails_helper"

RSpec.describe PagesController, type: :controller do  
  describe "GET /" do
    it "renders home template" do
      get :home
      expect(response).to render_template :home
    end
  end
  
  describe "GET #pricing" do
   it "renders pricing template" do
    get :pricing
    expect(response).to render_template :pricing
   end
  end

  describe "GET #features" do
    it "renders features template" do
      get :features
      expect(response).to render_template :features
    end
  end

  describe "GET #showcase" do
    it "renders showcase template" do
      get :showcase
      expect(response).to render_template :showcase
    end
  end

  describe "GET #preview" do
    it "renders preview template" do
      get :preview
      expect(response).to render_template :preview
    end
  end
end
