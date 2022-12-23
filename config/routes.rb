Rails.application.routes.draw do
  resources :learns
  resources :wonders
  resources :knows
  resources :wishlists, only: [:index, :show, :create, :destroy]
  resources :books, only: [:index, :show]
  resources :literatures
  resources :my_collections, only: [:index, :show, :create, :destroy]
  resources :women, only: [:index, :show]
  resources :notes
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  post '/knows/:user_id/:woman_id', to: 'knows#create'
  delete '/knows/:user_id/:know_id', to: 'knows#destroy'
  post '/wonders/:user_id/:woman_id', to: 'wonders#create'
  delete '/wonders/:user_id/:wonder_id', to: 'wonders#destroy'
  get '/knows/:user_id/:woman_id', to: 'knows#index'
  get '/wonders/:user_id/:woman_id', to: 'wonders#index'
  get '/learns/:user_id/:woman_id', to: 'learns#index'
  post '/learns/:user_id/:woman_id', to: 'learns#create'
  delete '/learns/:user_id/:learn_id', to: 'learns#destroy'
  # Defines the root path route ("/")
  # root "articles#index"
  # get '/hello', to: 'application#hello_world'
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
