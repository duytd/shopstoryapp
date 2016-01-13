class CreateExtensions < ActiveRecord::Migration
  def change
    create_table :extensions do |t|
      t.decimal :price, default: 0
      t.string :name
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
