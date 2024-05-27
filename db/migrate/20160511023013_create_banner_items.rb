class CreateBannerItems < ActiveRecord::Migration[4.2]
  def change
    create_table :banner_items do |t|
      t.references :banner, index: true, foreign_key: true
      t.string :text
      t.string :image
      t.string :link
      t.boolean :show_image

      t.timestamps null: false
    end
  end
end
