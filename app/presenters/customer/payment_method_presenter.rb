class Customer::PaymentMethodPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      type: @object.type.underscore,
      name: @object.name,
      mobile_submethods: @object.mobile_submethods,
      desktop_submethods: @object.desktop_submethods
    }
  end
end
