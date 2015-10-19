class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.references :customer, index: true, foreign_key: true
      t.decimal :subtotal
      t.decimal :shipping
      t.decimal :tax
      t.integer :product_count
      t.decimal :total
      t.integer :status, default: 0
      t.string :token
      t.string :ip_address
      t.integer :payment_status, default: 0
      t.timestamps null: false
    end
  end
end
