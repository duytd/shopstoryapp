class Menu < ActiveRecord::Base
  enum position: [:main, :footer]

  accepts_nested_attributes_for :menu_items, allow_destroy: true, reject_if: :all_blank?
end
