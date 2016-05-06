class AddImageToPaymentMethods < ActiveRecord::Migration
  def change
    add_column :payment_methods, :image, :string
  end
end
