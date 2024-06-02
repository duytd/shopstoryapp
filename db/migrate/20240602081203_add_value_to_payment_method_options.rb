class AddValueToPaymentMethodOptions < ActiveRecord::Migration[5.2]
  def change
    add_column :payment_method_options, :value, :string, default: ""
  end
end
