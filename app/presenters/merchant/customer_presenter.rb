class Merchant::CustomerPresenter < Merchant::BasePresenter
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
      locale: @object.locale,
      total_orders: @object.total_orders,
      total_spent: @object.total_spent,
      last_sign_in_at: @object.last_sign_in_at
    }
  end
end

