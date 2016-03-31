class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new
    if user.is_a? Admin
      can :manage, :all
    elsif user.is_a?(Merchant) && current_tenant?(user)
      can :manage, Category
      can :manage, CustomPage
      can :manage, Product
      can [:read, :create, :update], Shop
      can [:read, :update], ThemeEditor
      can [:read, :update], PaymentMethodShop
      can :manage, Order
      can :read, Extension
      can :create, ShopExtension
      can :manage, ShippingRate
      can :manage, Customer
      can :manage, Menu
    elsif user.is_a? Customer
      can :read, Category
      can :read, Product
      can :read, Order
      can [:read], Customer
      can :manage, OrderProduct
      can [:read, :create, :update], Order
      can :read, Menu
    else
      can :read, Category
      can :read, Product
      can :manage, OrderProduct
      can [:read, :create, :update], Order
      can :read, Menu
    end
  end

  private
  def current_tenant? user
    Apartment::Tenant.current == user.shop.subdomain
  end
end
