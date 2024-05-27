class AddImageToPaymentMethods < ActiveRecord::Migration[4.2]
  def change
    add_column :payment_methods, :image, :string
  end
end
