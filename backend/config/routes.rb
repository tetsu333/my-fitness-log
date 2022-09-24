Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "roots#index"
  namespace :api do
    namespace :v1 do
      post "login", to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      # get "sessions", to: "sessions#show"
      resources :exercises, only: [:index, :create, :update]
      resources :homes, only: [:index]
      resources :repetitions, only: [:index, :new, :create, :destroy]
      resources :users, :only => :create
    end
  end
end
