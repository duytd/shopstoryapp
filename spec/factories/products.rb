FactoryGirl.define do
  factory :product do
    name_en "English Name"
    name_ko "Korean Name"
    description_en "English Description"
    description_ko "Korean Description"
    price "9.99"
    sale_off "9.99"
    visibility false
    vendor "Product Vendor"
    sku "A001"
    in_stock 1
  end

  factory :other_product, parent: :product do
    name_en "Other English Name"
    name_ko "Other Korean Name"
  end

  factory :blank_product, parent: :product do
    in_stock nil
    sale_off nil
    featured nil
    unlimited nil
    visibility nil
  end
end
