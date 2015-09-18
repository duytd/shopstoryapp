module Merchant::ShopsHelper
  def all_timezones
    ActiveSupport::TimeZone.all.map{|z| [z.tzinfo.identifier, z.to_s]}
  end

  def all_currencies
    Money::Currency.table.map{|c| [c[1][:iso_code], "#{c[1][:name]} (#{c[1][:iso_code]})"]}
  end

  def all_countries
    ISO3166::Country.all.map{|c| [c.alpha2, c.name]}
  end
end
