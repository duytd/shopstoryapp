class Merchant::MenuItemsController < Merchant::BaseController
  load_and_authorize_resource
  before_action :load_menu, only: :create

  def create
    @menu_item =  case params[:type]
                                      when "home"
                                        Menu::Home.new menu_item_params
                                      when "category_all"
                                        Menu::CategoryAll.new menu_item_params
                                      when "category"
                                        Menu::Category.new menu_item_params
                                      when "product"
                                        Menu::Product.new menu_item_params
                                      when "product_all"
                                        Menu::ProductAll.new menu_item_params
                                      when "page"
                                        Menu::Page.new menu_item_params
                                      when "url"
                                        Menu::Url.new menu_item_params
                                      end

    if params[:menu_item][:parent_id].present?
      @parent = MenuItem.find params[:menu_item][:parent_id]
      @menu_item.position = @parent.children.count
    else
      @menu_item.position = @menu.menu_items.is_parent.count
    end

    @menu_item.menu = @menu

    if @menu_item.save
      render json: @menu_item, status: :ok
    else
      render json: @menu_item.errors, status: :unprocessable_entity
    end
  end

  def update
    if @menu_item.update menu_item_params
      render json: @menu_item, status: :ok
    else
      render json: @menu_item.errors, status: :unprocessable_entity
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

  def menu_item_params
    params.require(:menu_item).permit MenuItem.globalize_attribute_names + [:id, :parent_id, :value]
  end
end
