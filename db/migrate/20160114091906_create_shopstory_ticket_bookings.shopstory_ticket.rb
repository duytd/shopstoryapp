# This migration comes from shopstory_ticket (originally 20160111042255)
class CreateShopstoryTicketBookings < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_bookings do |t|
      t.decimal :subtotal
      t.references :shopstory_ticket_seller, index: true, foreign_key: true
      t.decimal :total
      t.integer :status, default: 0
      t.string :name
      t.string :email
      t.string :phone

      t.timestamps null: false
    end
  end
end
