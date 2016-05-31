class UnavailableDiscountCode < StandardError
end

class InvalidDiscountCode < StandardError
end

class DiscountService
  def initialize params
    @discount = params[:discount]
  end

  def verify code
    discount = Discount.find_by code: code
    raise InvalidDiscountCode if discount.nil?
    raise UnavailableDiscountCode if discount.start_date < Time.zone.now || discount.expiry_date > Time.zone.now

    return discount
  end

  def calculate amount
    if @discount.percentage?
      amount - amount * @discount.amount / 100
    else
      amount - @discount.amount
    end
  end
end
