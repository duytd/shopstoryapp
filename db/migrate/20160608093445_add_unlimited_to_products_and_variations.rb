class AddUnlimitedToProductsAndVariations < ActiveRecord::Migration
  def change
    add_column :products, :unlimited, :boolean, default: true
    add_column :variations, :unlimited, :boolean, default: true
  end
end
