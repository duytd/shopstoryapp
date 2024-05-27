class CreateCategoryProducts < ActiveRecord::Migration[4.2]
  def change
    create_table :category_products do |t|
      t.references :category, index: true, foreign_key: true
      t.references :product, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
