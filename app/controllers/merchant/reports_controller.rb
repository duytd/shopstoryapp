class Merchant::ReportsController < Merchant::BaseController
  def order
    @data = case params[:report_type]
      when "hourly"
        Order.hourly_data
      when "weekly"
        Order.weekly_data
      when "monthly"
        Order.monthly_data
      when "yearly"
        Order.yearly_data
      else
        Order.daily_data
      end

    respond_to do |format|
      format.html
      format.json{ render json: @data, status: :ok }
    end
  end

  def product
    @data = []

    Product.all.each do |p|
      @data << { product: p, total_sale: p.total_sale } if p.total_sale > 0
    end

    @data.sort_by{ |d| d[:total_sale] }.reverse!
  end

  def payment
    @data = []
    total = Order.success.count

    PaymentMethod.all.each do |p|
      @data << { payment_method: p, total_sale: p.total_sale, percentage: (p.total_sale/total.to_f*100)} if p.total_sale > 0
    end

    @data.sort_by{ |d| d[:percentage] }.reverse!
  end
end
