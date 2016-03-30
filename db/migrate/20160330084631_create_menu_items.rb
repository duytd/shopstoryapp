class CreateMenuItems < ActiveRecord::Migration
  def up
    create_table :menu_items do |t|
      t.references :menu, index: true, foreign_key: true
      t.integer :parent_id
      t.string :name
      t.integer :position
      t.string :type
      t.string :value

      t.timestamps null: false
    end

    MenuItem.create_translation_table! name: :string
  end

  def down
    drop_table :menu_items
    MenuItem.drop_translation_table!
  end
end
