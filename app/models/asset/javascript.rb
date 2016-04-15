class Asset::Javascript < Asset
  def self.bundle bundle
    bundle.javascript = Asset::Javascript.all.map{|x| x.content}.join(" ")
    bundle.save!
  end

  def path
    "assets/javascripts/#{name}"
  end
end
