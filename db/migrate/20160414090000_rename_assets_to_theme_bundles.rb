class RenameAssetsToThemeBundles < ActiveRecord::Migration
  def change
    rename_table :assets, :theme_bundles
  end
end
