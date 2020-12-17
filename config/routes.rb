Rails.application.routes.draw do

  root "welcome#index"
  get '/home', to: 'home#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  
  resources :scrapping_data do
    get '/fetch_data/:data_source' => "scrapping_data#fetch_data", as: :fetch_data, on: :collection
  end

end
