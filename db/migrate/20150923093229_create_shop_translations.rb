class CreateShopTranslations < ActiveRecord::Migration
  def up
    Shop.create_translation_table! street: :string
    rename_column :shop_translations, "public.shop_id", "shop_id"
  end

  def down
    Shop.drop_translation_table!
  end
end
