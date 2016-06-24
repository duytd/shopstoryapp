require "rails_helper"

RSpec.describe Theme, type: :model do
  let(:default_theme) {create :default_theme}
  let(:theme) {build :theme}

  context "when saving a default theme and there is an existed theme was set to default" do
    it "should unset default theme" do
      default_theme_id = default_theme.id
      theme.default = true
      theme.save
      expect(Theme.find(default_theme_id).default).to eq(false)
    end
  end

  context "when saving a normal theme and there is an existed theme was set to default" do
    it "should not unset default theme" do
      default_theme_id = default_theme.id
      theme.save
      expect(Theme.find(default_theme_id).default).to eq(true)
    end
  end

  describe "validations" do
    context "when default attribute is unchecked on updated" do
      before do
        default_theme.default = false
      end

      it {expect(default_theme).to have(1).errors_on(:default)}
    end
  end

  describe ".get_default_theme" do
    it "should return default theme" do
      default_theme = default_theme
      expect(Theme.get_default_theme).to eq(default_theme)
    end
  end

  describe ".theme_dirs" do
    before do
      allow(Dir).to receive(:entries).and_return([".", "..", "theme-a", "theme-b"])
    end

    it "should return all theme directories" do
      expect(Theme.theme_dirs).to eq(["theme-a", "theme-b"])
    end
  end

  describe ".get_theme_information" do
    before do
      allow(File).to receive(:read).and_return("{\n  \"author\": \"Author\",\n  \"version\": 1.0,\n  \"description\": \"Description\"\n}\n")
    end

    it "should return correct theme information in json" do
      information = Theme.get_theme_information("directory")
      expect(information["author"]).to eq("Author")
      expect(information["description"]).to eq("Description")
      expect(information["version"]).to eq(1.0)
    end
  end
end
