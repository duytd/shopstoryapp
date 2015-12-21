class CreatePaymentMethodShops < ActiveRecord::Migration
  def change
    create_table :payment_method_shops do |t|
      t.references :payment_method, index: true, foreign_key: true
      t.references :shop, index: true, foreign_key: true
      t.boolean :active, default: true
      t.string :key

      t.timestamps null: false
    end
  end
end
