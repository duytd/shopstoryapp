class AddActiveToPaymentMethods < ActiveRecord::Migration[5.2]
  def change
    add_column :payment_methods, :active, :boolean, default: false
  end
end
