class CreateDiscounts < ActiveRecord::Migration[4.2]
  def change
    create_table :discounts do |t|
      t.string :code
      t.date :start_date
      t.date :expiry_Date
      t.integer :discount_type
      t.decimal :value
      t.boolean :active, default: false

      t.timestamps null: false
    end
  end
end
