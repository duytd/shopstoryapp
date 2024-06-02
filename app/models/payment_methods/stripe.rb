# == Schema Information
#
# Table name: public.payment_methods
#
#  id                 :integer          not null, primary key
#  active             :boolean          default(FALSE)
#  description        :text
#  desktop_submethods :string
#  image              :string
#  key_required       :boolean
#  mobile_submethods  :string
#  name               :string
#  type               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
module PaymentMethods
  class Stripe < ::PaymentMethod
    def required_fields
      %w( secret_key publishable_key )
    end
  end
end
