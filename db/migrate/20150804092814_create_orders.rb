class CreateOrders < ActiveRecord::Migration[4.2]
  def change
    create_table :orders do |t|
      t.string :type
      t.references :customer, index: true, foreign_key: true
      t.decimal :subtotal, default: 0
      t.decimal :shipping, default: 0
      t.decimal :tax, default: 0
      t.integer :product_count, default: 0
      t.decimal :total, default: 0
      t.integer :status, default: 0
      t.string :token
      t.string :ip_address
      t.timestamps null: false
    end

    execute "SELECT setval('orders_id_seq', 1000)"
  end
end
