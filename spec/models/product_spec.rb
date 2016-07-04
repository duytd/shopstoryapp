require "rails_helper"

RSpec.describe Product, type: :model do
  let(:product) {build :product}
  let(:other_product) {build :other_product}

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

  it "should remove colon inside price value" do
    product.price = "1,000"
    expect(product.price).to eq(1000)
  end

  it "should ensure that default value is assigned" do
    product = create :blank_product
    expect(product.visibility).to eq(true)
    expect(product.featured).to eq(false)
    expect(product.unlimited).to eq(true)
    expect(product.sale_off).to eq(0)
    expect(product.in_stock).to eq(nil)
  end

  it "should update its inventory if it contains variation" do
    variation = build :variation
    variation.in_stock = 10
    variation.unlimited = false
    variation.save
    product_id = variation.product.id
    product = Product.find product_id
    product.save

    expect(product.in_stock).to eq(10)
  end

  it "should create a master variation after create" do
    product.save
    product_id = product.id
    product = Product.find product_id
    expect(product.variations.count).to eq(1)
    expect(product.variations.first.master).to eq(true)
  end

  it "should update master on save" do
    product.price = 2000
    product.sku = "A002"
    product.save

    expect(product.master.price).to eq(2000)
    expect(product.master.sku).to eq("A002")
  end

  it "should set itself to unlimited if it contains unlimited variation" do
    variation = build :variation
    variation.unlimited = true
    variation.save
    product_id = variation.product.id
    product = Product.find product_id
    product.save

    expect(product.in_stock).to eq(nil)
    expect(product.unlimited).to eq(true)
  end

  it "should use english name to generate slug" do
    product.name_en = "English Name"
    product.save
    expect(product.slug).to eq("english-name")
  end

  describe ".filtered_by_vendor" do
    before do
      product.vendor = "Vendor 1"
      other_product.vendor = "Vendor 2"
      product.save
      other_product.save
    end

    context "vendor list is not presented" do
      it{expect(Product.filtered_by_vendor(nil)).to eq([product, other_product])}
    end

    context "vendor list is presented but empty" do
      it{expect(Product.filtered_by_vendor([])).to eq([product, other_product])}
    end

    context "vendor list is presented, not empty and has existed vendor" do
      it{expect(Product.filtered_by_vendor(["Vendor 1"])).to eq([product])}
    end

    context "vendor list is presented, not empty and doesnt have existed vendor" do
      it{expect(Product.filtered_by_vendor(["Strange Vendor"])).to eq([])}
    end
  end

  describe ".filtered_by_category" do
    before(:each) do
      @other_category = create :other_category
      @category_product = create :category_product
      @product = @category_product.product
      other_product.save
      @category_id =  @category_product.category.id
    end

    context "category id is not presented" do
      it{expect(Product.filtered_by_category(nil)).to eq([@product, other_product])}
    end

    context "category id is presented and doesnt belongs to an existed category" do
      it{expect(Product.filtered_by_category(999)).to eq([])}
    end

    context "category id is presented and belongs to an existed category which contains products" do
      it{expect(Product.filtered_by_category(@category_id)).to eq([@product])}
    end

    context "category id is presented and belongs to an existed category which doesnt contain products" do
      it{expect(Product.filtered_by_category(@other_category.id)).to eq([])}
    end
  end

  describe ".filtered_by_price" do
    before do
      product.price = 1000
      other_product.price = 2000
      product.save
      other_product.save
    end

    context "price range is not presented" do
      it{expect(Product.filtered_by_price(nil)).to eq([product, other_product])}
    end

    context "price range is presented but empty" do
      it{expect(Product.filtered_by_price([])).to eq([product, other_product])}
    end

    context "price range is presented but min equal max" do
      it{expect(Product.filtered_by_price([1000, 1000])).to eq([product, other_product])}
    end

    context "price range is presented and min < max" do
      it{expect(Product.filtered_by_price([1000, 1200])).to eq([product])}
    end
  end

  describe ".sorted_by" do
    before do
      product.price = 2000
      product.weight = 20
      other_product.price = 1000
      other_product.weight = 10
      product.save
      other_product.save
    end

    context "provided attribute is not sortable" do
      it {expect(Product.sorted_by("weight", "asc")).to eq([product, other_product])}
    end

    context "provided attribute is sortable but direction is invalid" do
      it {expect(Product.sorted_by("price", "descending")).to eq([product, other_product])}
    end

    context "provided attribute is sortable and direction is valid" do
      it {expect(Product.sorted_by("price", "asc")).to eq([other_product, product])}
    end

    context "sort by name in korean locale" do
      before do
        I18n.locale = :ko
      end

      it {expect(Product.sorted_by("name", "desc")).to eq([other_product, product])}
    end

    context "sort by name in english locale" do
      before do
        I18n.locale = :en
      end

      it {expect(Product.sorted_by("name", "desc")).to eq([other_product, product])}
    end
  end

  describe "#create_variations" do
    before do
      @variation_option_value = create :variation_option_value
      other_variation_option_value = build :other_variation_option_value
      other_variation_option_value.variation_option = @variation_option_value.variation_option
      other_variation_option_value.save
      @product = Product.find @variation_option_value.variation_option.product.id
      @product.create_variations
    end

    it {expect(@product.variations.not_master.count).to eq(2)}
  end

  describe "#total_sale" do
  end

  describe ".search_by_name" do
    before do
      product.save
    end

    context "search by partial name" do
      before do
        I18n.locale = :en
      end

      it {expect(Product.search_by_name("English Na")).to eq([product])}
    end

    context "search in english locale" do
      before do
        I18n.locale = :en
      end

      it {expect(Product.search_by_name("English Name")).to eq([product])}
    end

    context "search in korean locale" do
      before do
        I18n.locale = :ko
      end

      it {expect(Product.search_by_name("Korean Name")).to eq([product])}
    end
  end
end
