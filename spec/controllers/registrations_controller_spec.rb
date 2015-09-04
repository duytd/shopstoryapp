require "rails_helper"

RSpec.describe RegistrationsController, type: :controller do
  describe "GET #new" do
    before do
      allow_message_expectations_on_nil
      allow(request.env["warden"]).to receive(:authenticate?).and_return false
      @request.env["devise.mapping"] = Devise.mappings[:merchant]
      get :new, shop_name: "example"
    end
    
    it "assign shop name instance variable to example" do
      expect(assigns(:shop_name)).to eq "example"
    end

    it "render correct template" do
      expect(response).to render_template :new
    end
  end
end
