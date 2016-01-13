# This migration comes from shopstory_ticket (originally 20160107094340)
class CreateShopstoryTicketSettings < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_settings do |t|
      t.references :shop, index: true, foreign_key: true
      t.string :client_id
      t.string :api_key
      t.boolean :active, default: true

      t.timestamps null: false
    end
  end
end
