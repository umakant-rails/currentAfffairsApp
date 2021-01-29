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
    resources :questionnaires do
      get '/add_questions_page' => "questionnaires#add_questions_page", 
        as: :add_questions_page, on: :collection
      get '/add_questions' => "questionnaires#add_questions_in_questionnaire", as: :add_questions
      get '/edit_page' => "questionnaires#edit_page", as: :questionnaires_edit_page, on: :collection
    end
    resources :questions
    resources :presentations do
      get '/get_questions' => "presentations#get_questions", as: :get_questions
      get '/generate_pdf' => "presentations#generate_pdf", as: :generate_pdf
    end
  end
  
end
