class AddPaidAtToOrders < ActiveRecord::Migration[4.2]
  def change
    add_column :orders, :paid_at, :datetime
  end
end
