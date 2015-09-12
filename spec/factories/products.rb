FactoryGirl.define do
  factory :product do
    name_en "Product English Name"
    name_ko "Product Korean Name"
    description_en "Product English Description"
    description_ko "Product Korean Description"
    price "9.99"
    sale_off "9.99"
    visibility false
    vendor "Product Vendor"
    sku "A001"
    in_stock 1
  end

  factory :other_product, parent: :product do
    name_en "Other Product English Name"
    name_ko "Other Product Korean Name"
  end
end
