class Merchant::DiscountPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      code: @object.code,
      discount_type: @object.discount_type,
      start_date: @object.start_date,
      expiry_date: @object.expiry_date,
      amount: @object.amount,
      active: @object.active
    }
  end
end
