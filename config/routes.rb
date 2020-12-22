Rails.application.routes.draw do

  root "welcome#index"
  
  get '/home', to: 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  namespace :admin do
    resources :dashboards, only: [:index]
    resources :scrapping_data do
    get '/scrap_data/:data_source' => "scrapping_data#scrap_data", as: :scrap_data, on: :collection
  end
  end
  

end
