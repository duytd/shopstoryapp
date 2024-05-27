class AddTicketCodeAndTicketSentAtToOrders < ActiveRecord::Migration[4.2]
  def change
    add_column :orders, :ticket_code, :string
    add_column :orders, :ticket_sent_at, :datetime
  end
end
