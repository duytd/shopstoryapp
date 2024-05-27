class CreateCategoryTranslations < ActiveRecord::Migration[4.2]
  def up
    Category.create_translation_table! name: :string
  end

  def down
    Category.drop_translation_table!
  end
end
