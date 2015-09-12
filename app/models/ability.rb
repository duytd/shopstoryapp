class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new
    if user.is_a? Admin
      can :manage, :all
    elsif user.is_a? Merchant
      can [:read, :create, :update, :destroy], Category if Apartment::Tenant.current == user.subdomain
      can [:read, :create, :update, :destroy], Product if Apartment::Tenant.current == user.subdomain
    else
    end
  end
end
