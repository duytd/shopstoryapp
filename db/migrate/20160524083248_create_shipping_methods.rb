class CreateShippingMethods < ActiveRecord::Migration
  def up
    create_table :shipping_methods do |t|
      t.string :name
      t.text :description
      t.string :tracking_url
      t.boolean :active, default: true

      t.timestamps null: false
    end

    ShippingMethod.create_translation_table! name: :string, description: :text
    rename_column :shipping_methods_translations, "public.shipping_method_id", "shipping_method_id"
  end

  def down
    drop_table :shipping_methods
    ShippingMethod.drop_translation_table!
  end
end
