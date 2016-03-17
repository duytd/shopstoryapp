class CreateVariations < ActiveRecord::Migration
  def change
    create_table :variations do |t|
      t.integer :in_stock
      t.string :image
      t.decimal :price
      t.string :sku
      t.references :product, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
