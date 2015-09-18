class CreateProductTranslations < ActiveRecord::Migration
  def up
    Product.create_translation_table! name: :string, description: :text
  end

  def down
    Product.drop_translation_table!
  end
end
