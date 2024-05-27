class AddExchangeRateToShops < ActiveRecord::Migration[4.2]
  def change
    add_column :shops, :exchange_rate, :decimal, default: 1000
  end
end
