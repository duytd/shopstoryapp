class CreateProductTags < ActiveRecord::Migration[4.2]
  def change
    create_table :product_tags do |t|
      t.references :product, index: true, foreign_key: true
      t.references :tag, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
