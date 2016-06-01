class CreateCustomerDiscounts < ActiveRecord::Migration
  def change
    create_table :customer_discounts do |t|
      t.references :customer, index: true, foreign_key: true
      t.references :discount, index: true, foreign_key: true
      t.references :order, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
