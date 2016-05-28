class Asset::Stylesheet < Asset
  def update_theme_bundle
    theme_bundle.stylesheet = Asset::Stylesheet.filter_by_theme(theme).map do |x|
      x.content
    end.join(" ")

    theme_bundle.save!
  end

  def path
    "assets/stylesheets/#{name}"
  end
end
