class CreateUsers < ActiveRecord::Migration[4.2]
  def change
    create_table :users do |t|
      t.string :type
      t.string :first_name
      t.string :last_name
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
