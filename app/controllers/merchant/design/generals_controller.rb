class Merchant::Design::GeneralsController < Merchant::BaseController
  def edit
    @props = {
      general: current_shop.as_json(only: [:logo, :term_id, :privacy_id]),
      pages: CustomPage.all
    }
  end

  def update
    if current_shop.update general_params
      render json: current_shop.as_json({only: [:logo, :term_id, :privacy_id]})
    else
      render json: current_shop.errors, status: :unprocessable_entity
    end
  end

  private
  def general_params
    params.require(:general).permit :logo, :term_id, :privacy_id
  end
end
