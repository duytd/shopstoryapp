class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.integer :gender
      t.string :phone
      t.string :address
      t.string :city
      t.string :country
      t.string :zip_code
      t.string :access_token
    end
  end
end
