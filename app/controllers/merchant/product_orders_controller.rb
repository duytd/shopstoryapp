class Merchant::ProductOrdersController < Merchant::BaseController
  before_action :load_product_order, only: [:edit, :update]
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
      url: merchant_product_orders_path,
      method: :post
    }
  end

  def create
    @product_order = ProductOrder.new order_params

    if @product_order.save
      render json: @product_order, status: :ok
    else
      render json: @product_order.errors, status: :unprocessable_entity
    end
  end

  def edit
    load_transaction_info

    @props = {
      order: present(@product_order),
      url: merchant_product_order_path(@product_order),
      transaction_info: @transaction_info,
      shipping_methods: ShippingMethod.all,
      method: :put,
      invoice_url: edit_merchant_product_order_path(@product_order, format: :pdf)
    }

    respond_to do |format|
      format.html
      format.pdf do
        if @product_order.unprocessed?
          head :unauthorized
        else
          render_invoice
        end
      end
    end
  end

  def update
    if @product_order.update order_params
      render json: @product_order, status: :ok
    else
      render json: @product_order.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product_order.destroy
    render json: nil, status: :ok
  end

  private
  def load_product_order
    @product_order = ProductOrder.includes(
      :customer, {payment: :payment_method}, :shipping_address, :billing_address, {order_products: {variation: [:product, :variation_option_values]}}
    ).find params[:id]
  end

  def load_transaction_info
    @transaction_info = if @product_order.payment && @product_order.payment.paid?
      get_transaction_info(@product_order)
    else
      []
    end
  end

  def render_invoice
    render pdf: "Invoice_##{@product_order.id}_#{Date.today}",
      template: "merchant/product_orders/edit.pdf.erb",
      layout: "merchant/layouts/pdf.html.erb",
      show_as_html: params[:debug].present? && Rails.env.development?,
      encoding: "utf8"
  end

  def list_all
    @product_orders = ProductOrder.includes(
        {payment: :payment_method}, :shipping_address, :customer, :billing_address, {order_products: {variation: [:product, :variation_option_values]}}
      ).page params[:page]

    @props = paginating @product_orders, {
      orders: @product_orders.map{|o| present(o)},
      url: merchant_product_orders_path
    }
  end

  def delete_all
    ProductOrder.where(id: params[:order_ids]).destroy_all
    render json: nil, status: :ok
  end
end
