class CreateMenus < ActiveRecord::Migration[4.2]
  def change
    create_table :menus do |t|
      t.string :name
      t.integer :position
      t.boolean :active, default: true

      t.timestamps null: false
    end
  end
end
