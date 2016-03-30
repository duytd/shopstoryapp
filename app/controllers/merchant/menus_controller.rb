class Merchant::MenusController < ApplicationController
  include TranslationsHelper
  load_and_authorize_resource

  def index
   if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      types: Menu.types,
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
  def list_all
    @props = {
      menus: Menu.all,
    }
  end

  def delete_all
    Menu.where(id: params[:menu_ids]).destroy_all
    render json: nil, status: :ok
  end

  def menu_params
    menu_items_permitted = MenuItem.globalize_attribute_names + [:parent_id, :position, :type, :value]
    params.require(:menu).permit :name, :position, :active, menu_items_attributes: menu_items_permitted
  end
end
