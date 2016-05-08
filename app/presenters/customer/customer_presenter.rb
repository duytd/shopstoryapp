class Customer::CustomerPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      first_name: @object.first_name,
      last_name: @object.last_name,
      gender: @object.gender,
      phone: @object.phone,
      address: @object.address,
      city: @object.city,
      country: @object.country,
      zip_code: @object.zip_code,
      email: @object.email,
      locale: @object.locale
    }
  end
end
  
