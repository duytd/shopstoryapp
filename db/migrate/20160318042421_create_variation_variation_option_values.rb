class CreateVariationVariationOptionValues < ActiveRecord::Migration[4.2]
  def change
    create_table :variation_variation_option_values do |t|
      t.references :variation, index: true, foreign_key: true
      t.references :variation_option_value, index: {name: "option_value_id"}, foreign_key: true

      t.timestamps null: false
    end
  end
end
