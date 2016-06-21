class Merchant::ReportsController < Merchant::BaseController
  def order
    @data = case params[:report_type]
      when "hourly"
        ProductOrder.hourly_data
      when "weekly"
        ProductOrder.weekly_data
      when "monthly"
        ProductOrder.monthly_data
      when "yearly"
        ProductOrder.yearly_data
      else
        ProductOrder.daily_data
      end

    respond_to do |format|
      format.html
      format.json{ render json: @data, status: :ok }
      format.csv do
        headers = @data.map{|d| d[:time]}
        rows = [@data.map{|d| d[:revenue]}]
        csv = export_to_csv headers, rows
        send_data csv, filename: "order_report_#{Time.now}.csv"
      end
    end
  end

  def product
    @data = []

    Product.all.each do |p|
      @data << { product: {id: p.id, name_ko: p.name_ko, name_en: p.name_en}, total_sale: p.total_sale } if p.total_sale > 0
    end

    @data.sort_by{ |d| d[:total_sale] }.reverse!

    respond_to do |format|
      format.html
      format.csv do
        headers = [
          I18n.t("activerecord.attributes.product.id"),
          I18n.t("activerecord.attributes.product.sku"),
          I18n.t("activerecord.attributes.product.name") + "(KO)",
          I18n.t("activerecord.attributes.product.name") + "(EN)",
          I18n.t("activerecord.attributes.product.total_sale")
        ]
        rows = @data.map{|d| [d[:product][:id], d[:product][:sku], d[:product][:name_ko], d[:product][:name_en], d[:total_sale]]}
        csv = export_to_csv headers, rows
        send_data csv, filename: "product_report_#{Time.now}.csv"
      end
    end
  end

  def payment
    @data = []
    total = Order.success.count

    PaymentMethod.all.each do |p|
      @data << { payment_method: {id: p.id, name: p.name}, total_sale: p.total_sale, percentage: (p.total_sale/total.to_f*100)} if p.total_sale > 0
    end

    @data.sort_by{ |d| d[:percentage] }.reverse!

    respond_to do |format|
      format.html
      format.csv do
        headers = [
          I18n.t("activerecord.attributes.payment_method.id"),
          I18n.t("activerecord.attributes.payment_method.name"),
          I18n.t("activerecord.attributes.payment_method.total_sale"),
          I18n.t("activerecord.attributes.payment_method.percentage")
        ]
        rows = @data.map{|d| [d[:payment_method][:id], d[:payment_method][:name], d[:total_sale], d[:percentage]]}
        csv = export_to_csv headers, rows
        send_data csv, filename: "payment_report_#{Time.now}.csv"
      end
    end
  end

  private
  def export_to_csv headers, rows
    CSV.generate do |csv|
      csv << headers
      rows.each do |row|
        csv << row
      end
    end
  end
end
