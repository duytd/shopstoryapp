class AddPaypalTokenAndPayerIdToPayments < ActiveRecord::Migration[4.2]
  def change
    add_column :payments, :paypal_token, :string
    add_column :payments, :payer_id, :string
  end
end
