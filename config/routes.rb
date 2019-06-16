Rails.application.routes.draw do
  # devise_for :users, path: 'api/auth'
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :flights
  end
  post 'api/flights/page', to: 'api/flights#page'
  get '*other', to: 'static#index'
end
