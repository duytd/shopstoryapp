class CreateShopstoryTicketTickets < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_tickets do |t|
      t.string :name
      t.decimal :price, default: 0
      t.references :shopstory_ticket_event, index: true, foreign_key: true
      t.integer :quantity, default: 10
      t.integer :min_quantity, default: 1
      t.integer :max_quantity, default: 10
      t.datetime :from_date
      t.datetime :to_date
      t.text :description
      t.string :color
      t.integer :sold, default: 0

      t.timestamps null: false
    end
  end
end
