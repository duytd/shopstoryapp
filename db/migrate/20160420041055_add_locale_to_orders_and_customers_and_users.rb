class AddLocaleToOrdersAndCustomersAndUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :orders, :locale, :string
    add_column :customers, :locale, :string
    add_column :users, :locale, :string
  end
end
