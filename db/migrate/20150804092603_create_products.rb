class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.decimal :sale_off
      t.boolean :visibility, default: true
      t.string :vendor
      t.string :sku
      t.integer :in_stock, default: 0

      t.timestamps null: false
    end
  end
end
