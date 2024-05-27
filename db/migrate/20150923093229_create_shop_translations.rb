class CreateShopTranslations < ActiveRecord::Migration[4.2]
  def up
    Shop.create_translation_table! street: :string
    rename_column :shop_translations, "public.shop_id", "shop_id"
  end

  def down
    Shop.drop_translation_table!
  end
end
