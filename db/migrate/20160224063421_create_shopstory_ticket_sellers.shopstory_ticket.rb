# This migration comes from shopstory_ticket (originally 20160106023746)
class CreateShopstoryTicketSellers < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_sellers do |t|
      t.string :email
      t.string :access_token

      t.timestamps null: false
    end

    add_index :shopstory_ticket_sellers, :email
  end
end
