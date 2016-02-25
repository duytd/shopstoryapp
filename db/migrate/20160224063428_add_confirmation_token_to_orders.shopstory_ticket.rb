# This migration comes from shopstory_ticket (originally 20160117030210)
class AddConfirmationTokenToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :confirmation_token, :string
  end
end
