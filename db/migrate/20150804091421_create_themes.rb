class CreateThemes < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :name
      t.text :description
      t.boolean :actived

      t.timestamps null: false
    end
  end
end
