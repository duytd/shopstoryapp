class CreateVariationOptionValues < ActiveRecord::Migration[4.2]
  def change
    create_table :variation_option_values do |t|
      t.string :name
      t.references :variation_option, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
