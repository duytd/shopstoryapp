class CreatePaymentMethods < ActiveRecord::Migration[4.2]
  def change
    create_table :payment_methods do |t|
      t.string :type
      t.string :name
      t.string :mobile_submethods
      t.string :desktop_submethods
      t.boolean :key_required
      t.text :description

      t.timestamps null: false
    end
  end
end
