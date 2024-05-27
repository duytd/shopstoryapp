class RenameAssetsToThemeBundles < ActiveRecord::Migration[4.2]
  def change
    rename_table :assets, :theme_bundles
  end
end
