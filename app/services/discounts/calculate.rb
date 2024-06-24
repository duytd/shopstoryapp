class Discounts::Calculate < ApplicationInteraction
  object :discount
  decimal :amount

  def execute
    if discount.percentage?
      amount - amount * discount.amount / 100
    else
      amount - discount.amount
    end
  end
end
