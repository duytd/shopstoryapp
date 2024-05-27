class CreateVariations < ActiveRecord::Migration[4.2]
  def change
    create_table :variations do |t|
      t.integer :in_stock, default: 1
      t.string :image
      t.decimal :price
      t.string :sku
      t.boolean :master, default: false
      t.references :product, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
