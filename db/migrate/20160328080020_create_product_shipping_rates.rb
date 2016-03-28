class CreateProductShippingRates < ActiveRecord::Migration
  def change
    create_table :product_shipping_rates do |t|
      t.references :product, index: true, foreign_key: true
      t.references :shipping_rate, index: true, foreign_key: true
      t.decimal :min_price
      t.decimal :rate

      t.timestamps null: false
    end
  end
end
