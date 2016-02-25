class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.references :payment_method, index: true
      t.references :order, index: true, foreign_key: true
      t.integer :state, default: 0
      t.decimal :amount, default: 0
      t.string :transaction_number
      t.string :paid_at
      t.string :
      t.string :submethod
      t.text :extra_data

      t.timestamps null: false
    end
  end
end
