class RenameThemeEditorsToAssets < ActiveRecord::Migration[4.2]
  def change
    rename_table :theme_editors, :assets
  end
end
