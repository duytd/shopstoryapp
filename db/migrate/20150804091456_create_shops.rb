class CreateShops < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.string :name
      t.string :subdomain
      t.string :domain
      t.string :legal_name
      t.string :email
      t.string :phone
      t.string :street
      t.string :city
      t.references :theme, index: true, foreign_key: true
      t.string :country
      t.string :zip_code
      t.string :time_zone
      t.integer :weight_unit
      t.string :currency
      t.references :plan, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.string :facebook_url
      t.string :instagram_url
      t.string :pinterest_url
      t.string :client_id
      t.string :api_key

      t.timestamps null: false
    end
  end
end
