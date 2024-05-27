class AddWeightToProducts < ActiveRecord::Migration[4.2]
  def change
    add_column :products, :weight, :string
  end
end
