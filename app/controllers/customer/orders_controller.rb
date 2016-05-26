require "rqrcode"

class Customer::OrdersController < Customer::BaseController
  authorize_resource

  def show
    load_order

    @props = {
      globalVars: @globalVars,
      order: present(@order, {presenter_klass: @presenter_klass}),
      qrcode: qrcode
    }

    load_qr_code if @order.is_a?(ShopstoryTicket::Booking)
  end

  def load_order
    @order = ProductOrder.find_by(id: params[:id]) || ShopstoryTicket::Booking.find_by(id: params[:id])
    raise ActiveRecord::RecordNotFound if @order.nil?

    @presenter_klass = case @order.class.name
                                              when "ProductOrder"
                                                Customer::ProductOrderPresenter
                                              when "ShopstoryTicket::Booking"
                                                ShopstoryTicket::BookingPresenter
                                              end
  end

  def load_qr_code
      qrcode = RQRCode::QRCode.new(@order.ticket_code).as_html if @order.ticket_code
      @props.merge({qrcode: qrcode})
  end
end
