class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders, options: "AUTO_INCREMENT = 1000" do |t|
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
  end
end
