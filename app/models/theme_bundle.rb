require "minifier"

class ThemeBundle < ApplicationRecord
  belongs_to :shop
  belongs_to :theme

  validates :shop_id, uniqueness: {scope: :theme_id}

  scope :with_theme, ->theme_id{find_by theme_id: theme_id}

  before_save :minify_js, if: proc{|a| a.javascript.present?}
  before_save :minify_css, if: proc{|a| a.stylesheet.present?}
  before_save :minify_locale, if: proc{|a| a.locale.present?}
  before_save :minify_template, if: proc{|a| a.template.present?}

  private
  def minify_js
    self.javascript = Minifier.minify_js javascript
  end

  def minify_css
    self.stylesheet = Minifier.minify_css stylesheet
  end

  def minify_locale
    self.locale = Minifier.minify_js locale
  end

  def minify_template
    self.template = Minifier.minify_js template
  end
end
