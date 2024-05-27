class CreateAssets < ActiveRecord::Migration[4.2]
  def change
    create_table :assets do |t|
      t.string :type
      t.string :name
      t.string :image
      t.text :content
      t.string :directory
      t.integer :theme_id

      t.timestamps null: false
    end
  end
end
