class Merchant::OrdersController < Merchant::BaseController
  before_action :load_order, only: [:edit, :update]
  load_and_authorize_resource
  include PaymentHelper

  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:index, :new, :edit]}

  def index
    if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      url: merchant_orders_path,
      method: :post
    }
  end

  def create
    @order = Order.new order_params

    if @order.save
      render json: @order, status: :ok
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def edit
    type = @order.abandoned? ? "abandoned" : "purchased"
    add_breadcrumb I18n.t("merchant.breadcrumbs.orders"), merchant_orders_path(type: type)
    load_transaction_info

    @props = {
      order: present(@order),
      url: merchant_order_path(@order),
      transaction_info: @transaction_info,
      shipping_methods: ShippingMethod.is_active.map{|s| present(s)},
      shipment_statuses: Shipment.statuses.keys.to_a,
      method: :put,
      invoice_url: edit_merchant_order_path(@order, format: :pdf)
    }

    respond_to do |format|
      format.html
      format.pdf do
        if @order.abandoned?
          head :unauthorized
        else
          render_invoice
        end
      end
    end
  end

  def update
    if @order.update order_params
      render json: present(@order), status: :ok
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @order.destroy
    render json: nil, status: :ok
  end

  private

  def order_params
    params.require(:order).permit shipment_attributes: [:id, :order_id, :tracking_code, :shipping_method_id, :status]
  end

  def load_order
    @order = Order.find params[:id]
  end

  def load_transaction_info
    @transaction_info = if @order.payment && @order.payment.paid?
      get_transaction_info(@order)
    else
      []
    end
  end

  def render_invoice
    render pdf: "Invoice_##{@order.id}_#{Date.today}",
      template: "merchant/orders/edit.pdf.erb",
      layout: "merchant/layouts/pdf.html.erb",
      show_as_html: params[:debug].present? && Rails.env.development?,
      encoding: "utf8"
  end

  def list_all
    @orders = if params[:type] == "abandoned"
      Order.abandoned.page params[:page]
    else
      Order.success.page params[:page]
    end

    @props = paginating @orders, {
      orders: @orders.map{|o| present(o)},
      url: merchant_orders_path(type: params[:type])
    }
  end

  def delete_all
    Order.where(id: params[:order_ids]).destroy_all
    render json: nil, status: :ok
  end
end
