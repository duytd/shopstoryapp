require "rails_helper"

RSpec.describe Category, type: :model do
  subject(:category) {build :category}

  describe "associations" do
    it {expect have_many :category_products}
    it {expect have_many :products}
  end

  context "is invalid without a name" do
    before do
      category.name_ko = nil
      category.name_en = nil
    end
    it {expect(category.error_on(:name_en).size).to eq 1}
    it {expect(category.error_on(:name_ko).size).to eq 1}
  end

  context "is invalid with a short name" do
    before do
      category.name_en = "a"
      category.name_ko = "b"
    end
    it {expect(category.error_on(:name_en).size).to eq 1}
    it {expect(category.error_on(:name_ko).size).to eq 1}
  end

  context "is invalid if name existed" do
    before do
      create :category
    end
    it {expect(category.error_on(:name_en).size).to eq 1}
    it {expect(category.error_on(:name_ko).size).to eq 1}
  end

  it "should use english name to generate slug" do
    category.name_en = "English Name"
    category.name_ko = "Korean Name"
    category.save
    expect(category.slug).to eq("english-name")
    expect(category.slug).not_to eq("korean-name")
  end
end
