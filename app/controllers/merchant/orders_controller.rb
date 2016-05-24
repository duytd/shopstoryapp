class Merchant::OrdersController < Merchant::BaseController
  before_action :load_order, only: [:edit, :update]
  load_and_authorize_resource
  include PaymentHelper

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
    @order = ProductOrder.new order_params

    if @order.save
      render json: @order, status: :ok
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def edit
    @transaction_info = get_transaction_info @order

    @props = {
      order: Merchant::OrderPresenter.new(@order),
      url: merchant_order_path(@order),
      transaction_info: @transaction_info,
      method: :put,
      invoice_url: edit_merchant_order_path(@order, format: :pdf)
    }

    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "Invoice_##{@order.id}_#{Date.today}",
          template: "merchant/orders/edit.pdf.erb",
          layout: "merchant/layouts/pdf.html.erb",
          show_as_html: params[:debug].present? && Rails.env.development?,
          encoding: "utf8"
      end
    end
  end

  def update
    if @order.update order_params
      render json: @order, status: :ok
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @order.destroy
    render json: nil, status: :ok
  end

  private
  def load_order
    @order = Order.includes(
      :customer, {payment: :payment_method}, :shipping_address, :billing_address, {order_products: {variation: [:product, :variation_option_values]}}
    ).find params[:id]
  end

  def list_all
    @orders = ProductOrder.includes(
        {payment: :payment_method}, :shipping_address, :customer, :billing_address, {order_products: {variation: [:product, :variation_option_values]}}
      ).page params[:page]

    @props = paginating @orders, {
      orders: @orders.map{|o| Merchant::OrderPresenter.new(o)},
      url: merchant_orders_path
    }
  end

  def delete_all
    ProductOrder.where(id: params[:order_ids]).destroy_all
    render json: nil, status: :ok
  end
end
