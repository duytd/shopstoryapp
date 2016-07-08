class AddSeoFieldsToShops < ActiveRecord::Migration
  def change
    add_column :shops, :meta_title, :string
    add_column :shops, :meta_description, :text
    add_column :shops, :meta_keywords, :text
  end
end
