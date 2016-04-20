class Customer::OrderMailer < ApplicationMailer
  def confirmation customer, locale
    @template = EmailTemplate.find_by_name "confirmation.#{locale}.liquid"
    @props = {
      'customer'=>customer
    }
  end
end
