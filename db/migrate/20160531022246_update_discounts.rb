class UpdateDiscounts < ActiveRecord::Migration
  def change
    rename_column :discounts, :expiry_Date, :expiry_date
    rename_column :discounts, :value, :amount
    change_column :discounts, :active, :boolean, default: true
  end
end
