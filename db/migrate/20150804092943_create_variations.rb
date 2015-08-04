class CreateVariations < ActiveRecord::Migration
  def change
    create_table :variations do |t|
      t.references :product, index: true, foreign_key: true
      t.string :color
      t.string :size
      t.integer :in_stock, default: 0

      t.timestamps null: false
    end
  end
end
