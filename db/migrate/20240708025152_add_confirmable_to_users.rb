class AddConfirmableToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column  :confirmation_token, :string
    add_column  :confirmed_at, :datetime
    add_column  :confirmation_sent_at, :datetime
    add_column  :unconfirmed_emailreconfirmable, :string
  end
end
