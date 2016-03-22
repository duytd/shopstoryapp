class AddBusinessFieldsToShop < ActiveRecord::Migration
  def change
    add_column :shops, :ceo, :string
    add_column :shops, :business_number, :string
    add_column :shops, :service_phone, :string
    add_column :shops, :online_retail_number, :string
    add_column :shops, :privacy_manager, :string
    add_column :shops, :privacy_email, :string
  end
end
