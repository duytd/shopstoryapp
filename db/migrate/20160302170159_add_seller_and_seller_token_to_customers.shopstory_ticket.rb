class AddSellerAndSellerTokenToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :seller, :boolean, default: false
    add_column :customers, :seller_token, :string
  end
end
