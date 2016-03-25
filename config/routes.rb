Rails.application.routes.draw do
  constraints Constraints::AdminDomainConstraint do
    namespace :admin, path: "" do
      root "pages#dashboard"
    end
  end

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

  constraints Constraints::CustomerDomainConstraint do
    mount ShopstoryTicket::Engine, at: "/ticket"

    devise_for :customers, path: "", path_names: {sign_in: "login",
      sign_out: "logout", password: "secret", registration: "register", confirmation: "verification",
      unlock: "unblock", sign_up: "signup"}, controllers: {registrations: "customer/registrations",
      sessions: "customer/sessions", omniauth_callbacks: "customer/customers/omniauth_callbacks"}

    namespace :api, defaults: {format: 'json'} do
      namespace :v1 do
        resources :products, only: [:index]
        devise_for :customers, path: "", path_names: {sign_in: "login", sign_out: "logout"}, skip: [:registrations, :password], controllers: {sessions: "api/v1/sessions"}
      end
    end

    namespace :customer, path: "" do
      root "pages#home"
      get :styles, to: "theme_editors#styles"
      get :scripts, to: "theme_editors#scripts"
      get :en, to: "theme_editors#en"
      get :ko, to: "theme_editors#ko"
      get :checkout, to: "pages#checkout"
      get :success, to: "pages#success"
      get :account, to: "customers#show", path: "my-account"

      resources :categories, only: [:index, :show]
      resources :products, only: :show
      resources :orders, only: [:show, :new, :create, :update] do
        resource :payment, only: :show
      end

      mount Inicis::Standard::Rails::Engine, at: "/inicis", as: "inicis"
      mount PaypalShopstory::Engine, at: "/paypal", as: "paypal"
      resources :order_products, only: [:create, :update, :destroy]
    end

    namespace :merchant, path: "admin" do
      root "pages#dashboard"
      get :credentials, to: "pages#credentials"

      resources :categories, except: :show do
        delete :index, on: :collection
      end

      resources :custom_pages,except: :show do
        delete :index, on: :collection
      end

      resources :products, except: :show do
        delete :index, on: :collection
        resources :variations, only: :create
      end

      namespace :design do
        resource :general, only: [:edit, :update]
      end

      resources :orders do
        delete :index, on: :collection
      end
      resources :shops, only: [:edit, :update]
      resources :theme_editors, only: [:edit, :update]
      resources :payment_method_shops, only: [:index, :update], path: "payment"
      resources :extensions, only: [:index, :show] do
        resource :shop_extension, only: :create
      end
    end
  end
end
