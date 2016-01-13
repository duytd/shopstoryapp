class CreateShopExtensions < ActiveRecord::Migration
  def change
    create_table :shop_extensions do |t|
      t.references :shop, index: true, foreign_key: true
      t.references :extension, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
