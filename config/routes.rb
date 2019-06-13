Rails.application.routes.draw do
  devise_for :users
  get '*other', to: 'static#index'
end
