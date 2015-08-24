class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :type
      t.string :first_name
      t.string :last_name
      t.string :subdomain
      t.string :company
      t.string :phone
      t.string :address
      t.string :city
      t.string :country
      t.string :zip_code

      t.timestamps null: false
    end
  end
end
