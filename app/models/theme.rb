class Theme < ActiveRecord::Base
  has_many :shops

  scope :default, ->{find_by(default: true)}
  scope :current, ->subdomain {joins(:shops)
    .where("shops.subdomain = ?", subdomain).first}
end
