class Merchant::SubscriptionMailer < ApplicationMailer
  def payment_succeeded email
    mail to: email, subject: "Welcome to My Awesome Site"
  end

  def payment_failed email, next_payment_attempt
    @next_payment_attempt = next_payment_attempt
    mail to: email, subject: "Welcome to My Awesome Site"
  end
end
