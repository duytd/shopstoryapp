class Menu::Url < MenuItem
  validates :value, format: { with: URI.regexp }, if: proc { |a| a.value.present? }

  def url
    value
  end
end
