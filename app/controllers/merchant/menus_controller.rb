class Merchant::MenusController < Merchant::BaseController
  before_action :load_menu, only: [:edit, :update]
  load_and_authorize_resource

  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:index, :new, :edit]}
  add_breadcrumb I18n.t("merchant.breadcrumbs.menus"), :merchant_menus_path, {only: [:new, :edit]}

  def index
    @menus = Menu.order(created_at: :asc).map{|m| present(m)}

    @props = {
      menus: @menus,
      new_url: new_merchant_menu_path
    }
  end

  def new
    @props = {
      positions: Menu.positions.keys.to_a,
      menu_item_types: MenuItem.types,
      categories: Category.all.map{|c| [c.name_en, c.name_ko, c.id]},
      pages: CustomPage.all.map{|p| [p.title_en, p.title_ko, p.slug]},
      url: merchant_menus_path,
      method: :post
    }
  end

  def create
    @menu =  Menu.new menu_params

    if @menu.save
      render json: present(@menu), status: :ok
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      menu: present(@menu),
      positions: Menu.positions.keys.to_a,
      categories: Category.all.map{|c| [c.name_en, c.name_ko, c.id]},
      pages: CustomPage.all.map{|p| [p.title_en, p.title_ko, p.slug]},
      menu_item_types: MenuItem.types,
      url: merchant_menu_path(@menu),
      method: :put
    }
  end

  def update
    if @menu.update menu_params
      render json: Merchant::MenuPresenter.new(@menu), status: :ok
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @menu.destroy
    render json: nil, status: :ok
  end

  private
  def load_menu
    @menu = Menu.find params[:id]
  end

  def menu_params
    menu_items_permitted = MenuItem.globalize_attribute_names + [:id, :parent_id, :position, :type, :value]
    params.require(:menu).permit :name, :position, :active, menu_items_attributes: menu_items_permitted
  end
end
