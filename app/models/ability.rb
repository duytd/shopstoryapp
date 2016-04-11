class Ability
  include CanCan::Ability
  include Merchant::SubscriptionsHelper

  def initialize user
    user ||= User.new
    if user.is_a? Admin
      can :manage, :all
    elsif user.is_a?(Merchant) && current_tenant?(user) && (user.has_subscription? || !trial_expired_for?(user))
      can :manage, Category
      can :manage, CustomPage
      can :manage, Product
      can [:read, :create, :update], Shop
      can [:read, :update], Asset
      can [:read, :update], PaymentMethodShop
      can :manage, Order
      can :manage, ShippingRate
      can :manage, Customer
      can :manage, Menu
      can :manage, MenuItem
    elsif user.is_a?(Merchant)
      can :manage, Subscription
    elsif user.is_a? Customer
      can :read, Category
      can :read, Product
      can :read, Order
      can [:read], Customer
      can :manage, OrderProduct
      can [:read, :create, :update], Order
    else
      can :read, Category
      can :read, Product
      can :manage, OrderProduct
      can [:read, :create, :update], Order
    end
  end

  private
  def current_tenant? user
    Apartment::Tenant.current == user.shop.subdomain
  end
end
