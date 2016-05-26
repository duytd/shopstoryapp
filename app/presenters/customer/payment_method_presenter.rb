class Customer::PaymentMethodPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      type: @object.type.underscore,
      name: @object.name,
      image: @object.image,
      mobile_submethods: @object.mobile_submethods,
      desktop_submethods: @object.desktop_submethods
    }
  end
end
