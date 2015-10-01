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
      resource :theme_editor, only: :show
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
    end
  end
end
