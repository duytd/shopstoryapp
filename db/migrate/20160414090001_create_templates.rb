class CreateTemplates < ActiveRecord::Migration[4.2]
  def change
    create_table :templates do |t|
      t.string :directory
      t.string :name
      t.text :content
      t.integer :theme_id, index: true

      t.timestamps null: false
    end
  end
end
