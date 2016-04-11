class RenameThemeEditorsToAssets < ActiveRecord::Migration
  def change
    rename_table :theme_editors, :assets
  end
end
