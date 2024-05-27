class AddSlugToProductsAndCategories < ActiveRecord::Migration[4.2]
  def change
    add_column :products, :slug, :string
    add_column :categories, :slug, :string
  end
end
