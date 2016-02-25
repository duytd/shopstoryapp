# This migration comes from shopstory_ticket (originally 20160111042417)
class CreateShopstoryTicketTicketBookings < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_ticket_bookings do |t|
      t.references :shopstory_ticket_ticket, index: {name: "ticket_id"}, foreign_key: true
      t.references :order, foreign_key: true
      t.integer :quantity
      t.decimal :unit_price

      t.timestamps null: false
    end
  end
end
