Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug
      resources :reviews, only:[:create, :update, :destroy]
      post '/login', to: 'tokens#login'
    end
  end
    
  get '*path', to: 'pages#index', via: :all
end