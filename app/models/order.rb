class Order < ActiveRecord::Base
  belongs_to :customer
  has_one :payment, dependent: :nullify
  has_one :payment_method, through: :payment

  enum status: [:incompleted, :pending, :processing, :processed, :shipping, :shipped, :returned, :cancelled]

  before_create :generate_token

  accepts_nested_attributes_for :payment, reject_if: :all_blank

  default_scope {order created_at: :desc}

  paginates_per Settings.paging.order

  def change_status status
    self.update_attributes status: status
  end

  protected
  def order_processed?
    status_changed? && self.processed?
  end
 
  private
  def generate_token
    self.token = SecureRandom.urlsafe_base64
    generate_token if Order.exists? token: self.token
  end
end
