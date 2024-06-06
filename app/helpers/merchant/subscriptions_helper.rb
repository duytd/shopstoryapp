module Merchant::SubscriptionsHelper
  PRODUCT_LIMIT = 5

  def free_plan? user
    Product.count <= PRODUCT_LIMIT
  end

  def remaining_products user
    remaining_size = PRODUCT_LIMIT - Product.count
    remaining_size < 0 ? 0 : remaining_size
  end
end
