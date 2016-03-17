class CreateVariationVariationOptions < ActiveRecord::Migration
  def change
    create_table :variation_variation_options do |t|
      t.references :variation, index: true, foreign_key: true
      t.references :variation_option, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
