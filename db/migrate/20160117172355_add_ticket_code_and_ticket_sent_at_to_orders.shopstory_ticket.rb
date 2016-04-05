class AddTicketCodeAndTicketSentAtToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :ticket_code, :string
    add_column :orders, :ticket_sent_at, :datetime
  end
end
