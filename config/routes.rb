Rails.application.routes.draw do
  constraints subdomain: false do
    get ":any", to: redirect(subdomain: "www", path: "/%{any}"), any: /.*/
  end

  constraints Constraints::AdminDomainConstraint do
    namespace :admin, path: "" do
      root "pages#dashboard"
      resources :plans, except: :show
    end

    devise_for :admins, path: "", path_names: {sign_in: "login", sign_out: "logout"}
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
    get :styles, to: "theme_bundles#styles"
    get :scripts, to: "theme_bundles#scripts"
    get :templates, to: "theme_bundles#templates"
    get :locale, to: "theme_bundles#locale"
    get :checkout, to: "pages#checkout"
    get :success, to: "pages#success"
    get :cart, to: "pages#cart"
    get :account, to: "customers#show", path: "my-account"

    resources :categories, only: [:index, :show] do
      get :filter, on: :member
    end

    resources :products, only: [:index, :show]
    resources :custom_pages, only: [:show]
    resources :orders, only: [:show, :new, :create, :update]

    mount Inicis::Standard::Rails::Engine, at: "/inicis", as: "inicis"
    mount KakaoShopstory::Engine, at: "/kakao", as: "kakao"
    mount PaypalShopstory::Engine, at: "/paypal", as: "paypal"
    mount StripeShopstory::Engine, at: "/stripe", as: "stripe"
    resources :order_products, only: [:create, :update, :destroy]
  end

  post :stripe_webhook, to: "stripe#webhook"

  namespace :merchant, path: "admin" do
    root "pages#dashboard"
    get :credentials, to: "pages#credentials"
    get :account, to: "pages#account"
    get :editor, to: "pages#editor"

    resources :categories, except: :show do
      delete :index, on: :collection
    end

    resources :custom_pages,except: :show do
      delete :index, on: :collection
    end

    resources :products do
      delete :index, on: :collection
      resources :variations, only: :create
      get :search, on: :collection
      post :export, on: :collection
      post :import, on: :collection
    end

    resources :shipping_rates, except: :show do
      delete :index, on: :collection
    end

    resources :customers, except: :show do
      delete :index, on: :collection
    end

    resources :menus, except: :show do
      resources :menu_items, only: [:create, :update, :destroy]
    end

    namespace :design do
      resource :general, only: [:edit, :update]
    end

    resources :orders, except: :show do
      delete :index, on: :collection
    end

    resources :reports, only: [] do
      get :product, on: :collection
      get :order, on: :collection
      get :payment, on: :collection
    end

    resources :subscriptions, only: [:index, :create, :update, :destroy]
    resources :shops, only: [:edit, :update]
    resources :assets, only: [:edit, :update]
    resources :templates, only: [:edit, :update]
    resources :email_templates, only: [:index, :edit, :update] do
      post :preview, on: :collection
    end
    resources :payment_method_shops, only: [:index, :update], path: "payment"
  end
end
