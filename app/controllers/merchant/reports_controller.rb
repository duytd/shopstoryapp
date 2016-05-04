class Merchant::ReportsController < Merchant::BaseController
  def order
  end

  def product
    @data = []

    Product.all.each do |p|
      @data << {product: p, total_sale: p.total_sale} if p.total_sale > 0
    end

    @data.sort_by{|d| d[:total_sale]}.reverse!
  end

  def payment
  end
end
