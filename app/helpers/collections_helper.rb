module CollectionsHelper
  def all_timezones
    ActiveSupport::TimeZone.all.map{|z| [z.tzinfo.identifier, z.to_s]}
  end

  def all_currencies
    currencies = []
    Money::Currency.table.each do |c|
      if ["KRW", "USD"].include?(c[1][:iso_code])
        currencies << [c[1][:iso_code], "#{c[1][:name]} (#{c[1][:iso_code]})"]
      end
    end

    currencies
  end

  def all_countries
    ISO3166::Country.all.map{|c| [c.alpha2, c.iso_short_name]}
  end
end
