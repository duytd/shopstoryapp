class CreateCustomPages < ActiveRecord::Migration[4.2]
  def up
    create_table :custom_pages do |t|
      t.string :title
      t.text :content
      t.string :slug

      t.timestamps null: false
    end

    CustomPage.create_translation_table! title: :string, content: :text
  end

  def down
    drop_table :custom_pages
    CustomPage.drop_translation_table!
  end
end
