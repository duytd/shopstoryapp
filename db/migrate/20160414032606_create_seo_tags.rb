class CreateSeoTags < ActiveRecord::Migration[4.2]
  def up
    create_table :seo_tags do |t|
      t.string :title
      t.text :meta_description
      t.string :meta_keywords
      t.integer :seoable_id
      t.string :seoable_type

      t.timestamps null: false
    end

    SeoTag.create_translation_table! title: :string, meta_description: :text, meta_keywords: :string
  end

  def down
    drop_table :seo_tags
    SeoTag.drop_translation_table!
  end
end
