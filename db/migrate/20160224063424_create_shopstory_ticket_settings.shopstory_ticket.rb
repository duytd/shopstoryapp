# This migration comes from shopstory_ticket (originally 20160107094340)
class CreateShopstoryTicketSettings < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_settings do |t|
      t.string :client_id
      t.string :api_key
      t.boolean :active, default: true

      t.timestamps null: false
    end
    
    add_index :shopstory_ticket_settings, :client_id
  end
end
