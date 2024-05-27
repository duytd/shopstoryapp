class CreatePaymentMethodShops < ActiveRecord::Migration[4.2]
  def change
    create_table :payment_method_shops do |t|
      t.references :payment_method, index: true, foreign_key: true
      t.references :shop, index: true, foreign_key: true
      t.boolean :active, default: false
      t.string :key

      t.timestamps null: false
    end
  end
end
