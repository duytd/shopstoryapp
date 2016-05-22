class Merchant::MenuItemsController < Merchant::BaseController
  before_action :load_menu_item, only: :update
  before_action :load_menu, only: :create
  load_and_authorize_resource

  def create
    begin
      @menu_item =  MenuItem.type_class params[:type]
      @menu_item.attributes = menu_item_params
      @menu_item.menu = @menu

      if @menu_item.save
        render json: Merchant::MenuItemPresenter.new(@menu_item), status: :ok
      else
        render json: @menu_item.errors, status: :unprocessable_entity
      end
    rescue KeyError
      render json: nil, status: :bad_request
    end
  end

  def update
    if @menu_item.update menu_item_params
      render json: Merchant::MenuItemPresenter.new(@menu_item), status: :ok
    else
      render json: Merchant::MenuItemPresenter.new(@menu_item).errors, status: :unprocessable_entity
    end
  end

  def destroy
    @menu_item.destroy
    render json: nil, status: :ok
  end

  private
  def load_menu
    @menu = Menu.find params[:menu_id]
  end

  def load_menu_item
    @menu_item = MenuItem.includes(:children).find params[:id]
  end

  def menu_item_params
    params.require(:menu_item).permit MenuItem.globalize_attribute_names + [:id, :parent_id, :value]
  end
end
