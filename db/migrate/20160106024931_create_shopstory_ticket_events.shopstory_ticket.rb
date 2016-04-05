class CreateShopstoryTicketEvents < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_events do |t|
      t.integer :source
      t.string :poster
      t.string :image
      t.string :name
      t.string :url
      t.string :venue
      t.string :date
      t.string :time
      t.references :seller, references: :shopstory_ticket_sellers, index: true

      t.timestamps null: false
    end

    add_index :shopstory_ticket_events, :source
  end
end
