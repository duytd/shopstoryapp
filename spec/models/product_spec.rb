require "rails_helper"

RSpec.describe Product, type: :model do
  subject(:product) {build :product}

  describe "associations" do
    it {expect  :category_products}
    it {expect have_many :categories}
    it {expect have_many :variations}
    it {expect have_many :product_tags}
    it {expect have_many :tags}
    it {expect have_many :product_images}
  end

  context "is invalid without a name" do
    before do
      product.name_ko = nil
      product.name_en = nil
    end
    it {expect(product.error_on(:name_en).size).to eq 1}
    it {expect(product.error_on(:name_ko).size).to eq 1}
  end

  context "is invalid with a short name" do
    before do
      product.name_en = "a"
      product.name_ko = "b"
    end
    it {expect(product.error_on(:name_en).size).to eq 1}
    it {expect(product.error_on(:name_ko).size).to eq 1}
  end

  context "is invalid if name existed" do
    before do
      create :product
    end
    it {expect(product.error_on(:name_en).size).to eq 1}
    it {expect(product.error_on(:name_ko).size).to eq 1}
  end

  context "is invalid without a price" do
    before {product.price = nil}
    it {expect(product.error_on(:price).size).to eq 1}
  end
end
