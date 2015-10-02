class CreateThemeEditors < ActiveRecord::Migration
  def change
    create_table :theme_editors do |t|
      t.text :stylesheet
      t.text :javascript
      t.references :shop, index: true, foreign_key: true
      t.references :theme, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
