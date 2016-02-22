class AddExchangeRateToShops < ActiveRecord::Migration
  def change
    add_column :shops, :exchange_rate, :decimal, default: 1000
  end
end
