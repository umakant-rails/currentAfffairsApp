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
      get '/unread' => "scrapping_data#unread", as: :unread, on: :collection
      get '/hold' => "scrapping_data#hold", as: :hold, on: :collection
      get '/mark_as_hold_or_read' => "scrapping_data#mark_as_hold_or_read", as: :mark_as_hold_or_read, on: :member
      get '/unhold' => "scrapping_data#unhold", as: :unhold, on: :member
    end
    resources :questionnaires do
      get '/add_questions_page' => "questionnaires#add_questions_page", 
        as: :add_questions_page, on: :collection
      post '/add_questions' => "questionnaires#add_questions_in_questionnaire", as: :add_questions, on: :member
      get '/questions' => "questionnaires#questions_of_questionnaire", as: :questions_of_questionnaire
    end
    resources :questions do
      get '/questions_for_fact'=> "questions#questions_for_fact", as: :questions_for_fact, on: :collection
    end
    resources :presentations do
      get '/get_questions' => "presentations#get_questions", as: :get_questions
      get '/generate_pdf' => "presentations#generate_pdf", as: :generate_pdf
    end
    resources :factsheets
    resources :factsheet_folders do
      get '/add_factsheet_page' => "factsheet_folders#add_factsheet_page", 
        as: :add_factsheet_page, on: :collection
      post '/add_factsheets' => "factsheet_folders#add_factsheets_in_folder", as: :add_factsheets, on: :member
    end
  end
  
end
