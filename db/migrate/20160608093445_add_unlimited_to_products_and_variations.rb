class AddUnlimitedToProductsAndVariations < ActiveRecord::Migration[4.2]
  def change
    add_column :products, :unlimited, :boolean, default: true
    add_column :variations, :unlimited, :boolean, default: true
  end
end
