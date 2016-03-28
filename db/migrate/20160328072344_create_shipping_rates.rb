class CreateShippingRates < ActiveRecord::Migration
  def up
    create_table :shipping_rates do |t|
      t.string :type
      t.string :name
      t.decimal :rate, default: 0
      t.decimal :min_price
      t.boolean :active, default: false

      t.timestamps null: false
    end

    ShippingRate.create_translation_table! name: :string
  end

  def down
    drop_table :shipping_rates
    ShippingRate.drop_translation_table!
  end
end
