# == Schema Information
#
# Table name: assets
#
#  id         :integer          not null, primary key
#  content    :text
#  directory  :string
#  image      :string
#  name       :string
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  theme_id   :integer
#
class Asset::Javascript < Asset
  def update_theme_bundle
    theme_bundle.javascript = Asset::Javascript.filter_by_theme(theme).map do |x|
      x.content
    end.join(" ")

    theme_bundle.save!
  end

  def path
    "assets/javascripts/#{name}"
  end
end
