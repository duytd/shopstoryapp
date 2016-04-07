class StripeController < ApplicationController
  protect_from_forgery with: :exception, except: [:webhook]

  def webhook
    begin
      event_json = JSON.parse request.body.read
      event = event_json

      event_object = event["data"]["object"]

      case event["type"]
        when "invoice.payment_succeeded"
          handle_success_invoice event_object
        when "invoice.payment_failed"
          handle_failure_invoice event_object, event["next_payment_attempt"]
        when "customer.subscription.deleted"
          handle_deleted_subscription
      end
    rescue Exception => ex
      render nothing: true, status: 422
      return
    end

    render nothing: true, status: 200
  end

   def handle_success_invoice invoice
    subscription = Subscription.find_by stripe_id: invoice["subscription"]
    merchant = subscription.merchant
    Merchant::SubscriptionMailer.delay.payment_succeeded merchant
  end

  def handle_failure_invoice invoice, next_payment_attempt
    subscription = Subscription.find_by stripe_id: invoice["subscription"]
    subscription.update_attribute status: Subscription.statuses[:past_due]
    merchant = subscription.merchant
    Merchant::SubscriptionMailer.delay.payment_failed merchant, next_payment_attempt
  end

  def handle_delete_subscription
    subscription.delete
  end
end
