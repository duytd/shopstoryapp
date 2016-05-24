class Merchant::AddressPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      email: @object.email,
      first_name: @object.first_name,
      last_name: @object.last_name,
      company: @object.company,
      address1: @object.address1,
      address2: @object.address2,
      city: @object.city,
      state: @object.state,
      country: @object.country,
      zip_code: @object.zip_code,
      phone_number: @object.phone_number,
      fax: @object.fax,
      alternative_phone: @object.alternative_phone,
      delivery_message: @object.delivery_message
    }
  end
end
