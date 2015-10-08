class CreateOrderProducts < ActiveRecord::Migration
  def change
    create_table :order_products do |t|
      t.references :order, index: true, foreign_key: true
      t.references :product, index: true, foreign_key: true
      t.decimal :unit_price
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
