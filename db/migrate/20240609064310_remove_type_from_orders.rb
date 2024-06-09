class RemoveTypeFromOrders < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :type
  end
end
