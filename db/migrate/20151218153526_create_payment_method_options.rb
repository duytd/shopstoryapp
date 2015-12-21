class CreatePaymentMethodOptions < ActiveRecord::Migration
  def change
    create_table :payment_method_options do |t|
      t.string :name
      t.string :title
      t.string :option_type
      t.string :default_value, default: ""
      t.references :payment_method, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
