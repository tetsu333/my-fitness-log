Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post "login", to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      resources :exercises, only: [:index, :create]
      resources :repetitions, only: [:index, :create]
      resources :users, :only => :create
    end
  end
end
