class AddConfirmationTokenToOrders < ActiveRecord::Migration[4.2]
  def change
    add_column :orders, :confirmation_token, :string
  end
end
