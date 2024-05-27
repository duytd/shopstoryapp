class CreateThemeEditors < ActiveRecord::Migration[4.2]
  def change
    create_table :theme_editors do |t|
      t.text :stylesheet
      t.text :javascript
      t.text :en_locale
      t.text :ko_locale
      t.references :shop, index: true, foreign_key: true
      t.references :theme, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
