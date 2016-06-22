class Merchant::Design::GeneralsController < Merchant::BaseController
  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:edit]}

  def edit
    @props = {
      general: current_shop.as_json(only: [:logo, :term_id, :privacy_id]),
      pages: CustomPage.all.map{|c| present(c)}
    }
  end

  def update
    if current_shop.update shop_params
      render json: current_shop.as_json({only: [:logo, :term_id, :privacy_id]})
    else
      render json: current_shop.errors, status: :unprocessable_entity
    end
  end

  private
  def shop_params
    params.require(:shop).permit :logo, :term_id, :privacy_id
  end
end
