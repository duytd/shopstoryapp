class Asset::Stylesheet < Asset
  def self.bundle bundle
    bundle.stylesheet = Asset::Stylesheet.all.map{|x| x.content}.join(" ")
    bundle.save!
  end

  def path
    "assets/stylesheets/#{name}"
  end
end
