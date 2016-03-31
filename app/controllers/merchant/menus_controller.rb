class Merchant::MenusController < Merchant::BaseController
  include TranslationsHelper
  load_and_authorize_resource

  def index
    @props = {
      menus: Menu.all,
    }
  end

  def new
    @props = {
      types: MenuItem.types,
      url: merchant_menus_path,
      method: :post
    }
  end

  def create
    @menu =  Menu.new menu_params

    if @menu.save
      render json: @menu, status: :ok
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      menu: @menu,
      url: merchant_menu_path(@menu),
      method: :put
    }
  end

  def update
    if @menu.update menu_params
      render json: @menu, status: :ok
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @menu.destroy
    render json: nil, status: :ok
  end

  private
  def menu_params
    menu_items_permitted = MenuItem.globalize_attribute_names + [:id, :parent_id, :position, :type, :value]
    params.require(:menu).permit :name, :position, :active, menu_items_attributes: menu_items_permitted
  end
end