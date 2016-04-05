class AddConfirmationTokenToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :confirmation_token, :string
  end
end
