class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new
    if user.is_a? Admin
      can :manage, :all
    elsif user.is_a? Merchant
      can [:read, :create, :update, :destroy], Category if current_tenant? user
      can [:read, :create, :update, :destroy], Product if current_tenant? user
      can [:read, :create, :update], Shop if current_tenant? user
      can [:read, :update], ThemeEditor if current_tenant? user
    elsif user.is_a? Customer
      can :read, Category
      can :read, Product
      can [:read, :create, :update, :destroy], OrderProduct
      can [:read, :create], Order
    else
      can :read, Category
      can :read, Product
      can [:read, :create, :update, :destroy], OrderProduct
      can [:read, :create, :update, :destroy], Order
    end
  end

  private
  def current_tenant? user
    Apartment::Tenant.current == user.shop.subdomain
  end
end
