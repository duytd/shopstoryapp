class Plan < ActiveRecord::Base
  has_many :shops

  validates :name, presence: true, uniqueness: true

  scope :default, ->{find_by(default: true)}
end
