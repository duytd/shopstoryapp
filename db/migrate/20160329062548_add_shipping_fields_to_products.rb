class AddShippingFieldsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :flat_shipping_rate, :decimal
    add_column :products, :pay_shipping_on_delivery, :boolean, default: false
  end
end
