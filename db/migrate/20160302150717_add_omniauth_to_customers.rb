class AddOmniauthToCustomers < ActiveRecord::Migration[4.2]
  def change
    add_column :customers, :provider, :string
    add_column :customers, :uid, :string
  end
end
