class UnavailableDiscountCode < StandardError
end

class InvalidDiscountCode < StandardError
end

class AlreadyUsedDiscountCode < StandardError
end

class DiscountService
  def initialize params
    @discount = params[:discount]
  end

  def self.verify code, customer
    discount = Discount.find_by code: code
    raise InvalidDiscountCode if discount.nil?

    if !discount.active? || discount.start_date > Time.zone.now || discount.expiry_date < Time.zone.now
      raise UnavailableDiscountCode
    end

    unless customer.customer_discounts.where(discount_id: discount).empty?
      raise AlreadyUsedDiscountCode
    end

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
