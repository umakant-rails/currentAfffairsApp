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
      get '/get_questions' => "questionnaires#get_questions", as: :get_questions
      get '/add_questions' => "questionnaires#add_questions_in_questionnaire", as: :add_questions
      get '/questionnaire_presentation' => "questionnaires#questionnaire_presentation", as: :questionnaire_presentation, on: :collection
      get '/generate_pdf' => "questionnaires#generate_pdf", as: :generate_pdf
    end
    resources :questions
  end
  

end
