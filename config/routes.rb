Rails.application.routes.draw do

  root "welcome#index"
  get '/home', to: 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

end
