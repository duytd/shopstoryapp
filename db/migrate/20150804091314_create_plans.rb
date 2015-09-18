class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.decimal :transaction_fee
      t.boolean :default, default: false

      t.timestamps null: false
    end
  end
end
