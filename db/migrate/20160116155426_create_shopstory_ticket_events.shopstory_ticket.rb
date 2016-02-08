# This migration comes from shopstory_ticket (originally 20160106024931)
class CreateShopstoryTicketEvents < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_events do |t|
      t.integer :source
      t.string :poster
      t.string :name
      t.string :url
      t.string :venue
      t.string :date
      t.string :time
      t.references :shopstory_ticket_seller, index: true, foreign_key: true

      t.timestamps null: false
    end

    add_index :shopstory_ticket_events, :source
  end
end
