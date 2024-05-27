class AddImageToThemes < ActiveRecord::Migration[4.2]
  def change
    add_column :themes, :image, :string
  end
end
