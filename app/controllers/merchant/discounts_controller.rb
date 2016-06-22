class Merchant::DiscountsController < Merchant::BaseController
  load_and_authorize_resource

  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:index, :new, :edit]}
  add_breadcrumb I18n.t("merchant.breadcrumbs.coupons"), :merchant_discounts_path, {only: [:new, :edit]}

  def index
    if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      url: merchant_discounts_path,
      redirect_url: merchant_discounts_path,
      method: :post,
      currency: current_shop.currency
    }
  end

  def create
    @discount = Discount.new discount_params
    if @discount.save
      render json: present(@discount), status: :ok
    else
      render json: @discount.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      discount: present(@discount),
      url: merchant_discount_path(@discount),
      redirect_url: merchant_discounts_path,
      method: :put,
      currency: current_shop.currency
    }
  end

  def update
    if @discount.update discount_params
      render json: present(@discount), status: :ok
    else
      render json: @discount.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @discount.destroy
    render json: nil, status: :ok
  end

  private
  def list_all
    @discounts = Discount.page params[:page]

    @props = paginating @discounts, {
      discounts: @discounts.map{|c| present(c)},
      new_url: new_merchant_discount_path,
      url: merchant_discounts_path
    }

    respond_to do |format|
      format.html
      format.json {render json: @props, status: :ok}
    end
  end

  def delete_all
    Discount.where(id: params[:discount_ids]).destroy_all
    render json: nil, status: :ok
  end

  def discount_params
    params.require(:discount).permit [:discount_type, :amount, :code, :start_date, :expiry_date, :active]
  end
end
