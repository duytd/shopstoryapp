class CreateShipments < ActiveRecord::Migration
  def change
    create_table :shipments do |t|
      t.integer :status, default: 0
      t.references :order, index: true, foreign_key: true
      t.string :tracking_code
      t.integer :shipping_method_id, index: true

      t.timestamps null: false
    end
  end
end
