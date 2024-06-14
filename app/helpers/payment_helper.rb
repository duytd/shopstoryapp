module PaymentHelper
  def get_transaction_info order
    data = order.payment.extra_data

    stripe_transaction_info(data)
  end

  private

  def stripe_transaction_info(data)
    [
      {
        label: "Type",
        value: data["payment_method_details"]["type"]
      },
      {
        label: "Card number",
        value: data["payment_method_details"]["card"]["last4"]
      },
      {
        label: "Amount",
        value: data["amount"]
      },
      {
        label: "Receipt URL",
        value: data["receipt_url"]
      }
    ]
  end
end
