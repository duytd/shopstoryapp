# This migration comes from shopstory_ticket (originally 20160116160933)
class AddShopstoryTicketSellerIdToOrders < ActiveRecord::Migration
  def change
    add_reference :orders, :seller, references: :customers, index: true
  end
end
