class AddShopstoryTicketSellerIdToOrders < ActiveRecord::Migration
  def change
    add_reference :orders, :seller, references: :shopstory_ticket_sellers, index: true
  end
end
