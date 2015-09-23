class Plan < ActiveRecord::Base
  has_many :shops

  scope :default, ->{find_by(default: true)}
end
