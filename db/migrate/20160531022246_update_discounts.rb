class UpdateDiscounts < ActiveRecord::Migration
  def change
    rename_column :discounts, :expiry_Date, :expiry_date
    rename_column :discounts, :value, :amount
  end
end
