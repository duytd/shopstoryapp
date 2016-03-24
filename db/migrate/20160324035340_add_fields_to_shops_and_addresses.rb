class AddFieldsToShopsAndAddresses < ActiveRecord::Migration
  def change
    add_column :shops, :logo, :string
    add_column :shops, :term_id, :integer
    add_column :shops, :privacy_id, :integer
    add_index :shops, :term_id
    add_index :shops, :privacy_id

    add_column :addresses, :alternative_phone, :string
    add_column :addresses, :delivery_message, :text
  end
end
