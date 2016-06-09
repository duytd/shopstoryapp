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
    @product_order = ProductOrder.new product_order_params

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
      shipping_methods: ShippingMethod.is_active.map{|s| present(s)},
      shipment_statuses: Shipment.statuses.keys.to_a,
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
    if @product_order.update product_order_params
      render json: present(@product_order), status: :ok
    else
      render json: @product_order.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product_order.destroy
    render json: nil, status: :ok
  end

  private
  def product_order_params
    params.require(:order).permit shipment_attributes: [:id, :order_id, :tracking_code, :shipping_method_id, :status]
  end

  def load_product_order
    @product_order = ProductOrder.find params[:id]
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
    @product_orders = ProductOrder.page params[:page]

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
