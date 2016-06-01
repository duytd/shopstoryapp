class Customer::DiscountPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      code: @object.code,
      discount_type: @object.discount_type,
      amount: @object.amount
    }
  end
end
