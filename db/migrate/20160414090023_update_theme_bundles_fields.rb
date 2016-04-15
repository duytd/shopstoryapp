class UpdateThemeBundlesFields < ActiveRecord::Migration
  def change
    remove_column :theme_bundles, :en_locale
    remove_column :theme_bundles, :ko_locale
    add_column :theme_bundles, :locale, :text
    add_column :theme_bundles, :template, :text
  end
end
