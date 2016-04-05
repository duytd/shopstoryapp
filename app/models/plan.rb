class Plan < ActiveRecord::Base
  has_many :shops

  validates :name, presence: true, uniqueness: true

  def self.default
    find_by default: true
  end
end
