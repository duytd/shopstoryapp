class CreateAddresses < ActiveRecord::Migration[4.2]
  def change
    create_table :addresses do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :company
      t.string :address1
      t.string :address2
      t.string :city
      t.string :state
      t.string :country
      t.string :zip_code
      t.string :phone_number
      t.string :fax
      t.references :order, index: true, foreign_key: true
      t.string :type

      t.timestamps null: false
    end
  end
end
