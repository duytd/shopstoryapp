class CreatePaymentMethodOptionShops < ActiveRecord::Migration
  def change
    create_table :payment_method_option_shops do |t|
      t.references :payment_method_option, index: true, foreign_key: true
      t.references :payment_method_shop, index: true, foreign_key: true
      t.string :value

      t.timestamps null: false
    end
  end
end
