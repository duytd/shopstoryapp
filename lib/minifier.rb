require "uglifier"
require "sass"

module Minifier
  def self.minify_css css
    engine = Sass::Engine.new css, syntax: :scss, style: :compressed
    engine.render
  end

  def self.minify_js js
    Uglifier.new.compile js
  end
end
