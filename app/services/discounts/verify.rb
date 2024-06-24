class Discounts::Verify < ApplicationInteraction
  string :code
  object :customer

  def execute
    discount = Discount.find_by code: code
    errors.add(:base, I18n.t("discounts.invalid")) if discount.nil?

    halt_if_error!

    if !discount.active? || discount.start_date > Time.zone.now || discount.expiry_date < Time.zone.now
      errors.add(:base, I18n.t("discounts.unavailable"))
    end

    halt_if_error!

    unless customer.customer_discounts.where(discount_id: discount).empty?
      errors.add(:base, I18n.t("discounts.already_used"))
    end

    discount
  end
end
