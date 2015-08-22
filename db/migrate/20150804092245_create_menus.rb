class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.integer :menu_type
      t.integer :target_id
      t.integer :parent_id
      t.integer :position
      t.integer :order

      t.timestamps null: false
    end
  end
end
