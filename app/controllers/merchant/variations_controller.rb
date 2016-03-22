class Merchant::VariationsController < ApplicationController
  before_action :load_product

  def create
    if @product.create_variations
      render json: @product.variations.not_master, status: :ok
    else
      render json: nil, status: :unprocessable_entity
    end
  end

  private
  def load_product
    @product = Product.find params[:product_id]
  end
end