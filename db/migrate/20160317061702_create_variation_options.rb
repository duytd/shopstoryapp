class CreateVariationOptions < ActiveRecord::Migration
  def change
    create_table :variation_options do |t|
      t.string :name
      t.string :value
      t.references :product, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
