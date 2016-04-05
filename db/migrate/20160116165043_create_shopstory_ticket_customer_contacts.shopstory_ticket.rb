class CreateShopstoryTicketCustomerContacts < ActiveRecord::Migration
  def change
    create_table :shopstory_ticket_customer_contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :email
      t.string :address
      t.text :note
      t.references :order, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
