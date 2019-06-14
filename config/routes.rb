Rails.application.routes.draw do
  devise_for :users, path: 'api/auth'
  namespace :api do
    resources :flights
  end
  get '*other', to: 'static#index'
end
