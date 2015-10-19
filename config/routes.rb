Rails.application.routes.draw do

  constraints Constraints::RootDomainConstraint do
    root "pages#home"
    get :showcase, to: "pages#showcase"
    get :pricing, to: "pages#pricing"
    get :preview, to: "pages#preview"
    get :features, to: "pages#features"

    devise_for :merchants, path: "", path_names: {sign_in: "login",
      sign_out: "logout", password: "secret", registration: "register", confirmation: "verification",
      unlock: "unblock", sign_up: "signup"}, controllers: {registrations: "registrations"}
  end

  constraints Constraints::AdminDomainConstraint do
    namespace :admin, path: "" do
      root "pages#dashboard"
    end
  end

  constraints Constraints::SubdomainConstraint do
    devise_for :customers, path: "", path_names: {sign_in: "login",
      sign_out: "logout", password: "secret", registration: "register", confirmation: "verification",
      unlock: "unblock", sign_up: "signup"}, controllers: {registrations: "customer/registrations",
      sessions: "customer/sessions"}

    namespace :customer, path: "" do
      root "pages#home"
      get :styles, to: "theme_editors#styles"
      get :scripts, to: "theme_editors#scripts"
      get :en, to: "theme_editors#en"
      get :ko, to: "theme_editors#ko"      
      
      resources :categories, only: [:index, :show]
      resources :products, only: :show
      resources :order_products, only: [:create, :update, :destroy]
    end

    namespace :merchant, path: "admin" do
      root "pages#dashboard"
      resources :categories, except: :show do
        delete :index, on: :collection
      end

      resources :products, except: :show do
        delete :index, on: :collection
      end

      resources :shops, only: [:edit, :update]
      resources :theme_editors, only: [:edit, :update]
    end
  end
end
