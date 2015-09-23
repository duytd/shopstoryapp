class CreateThemes < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :name
      t.string :directory
      t.string :author
      t.decimal :version
      t.text :description
      t.boolean :actived, default: true
      t.boolean :default, default: false

      t.timestamps null: false
    end
  end
end
