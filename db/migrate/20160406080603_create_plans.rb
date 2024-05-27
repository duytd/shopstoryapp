class CreatePlans < ActiveRecord::Migration[4.2]
  def change
    create_table :plans do |t|
      t.string :name
      t.string :stripe_id
      t.float :price
      t.string :interval
      t.text :features
      t.boolean :highlight, default: false
      t.integer :position

      t.timestamps null: false
    end
  end
end
