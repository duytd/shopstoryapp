module Orderable
  extend ActiveSupport::Concern

  included do
    scope :latest, ->{order created_at: :desc}
  end
end
