class CreateVariationOptions < ActiveRecord::Migration[4.2]
  def change
    create_table :variation_options do |t|
      t.string :name
      t.references :product, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
