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
