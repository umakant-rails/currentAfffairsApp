class WelcomeController < ApplicationController
  layout 'application'  

  def index 
    @questionnaires = Questionnaire.all
    @questionnaire = Questionnaire.joins(:questions).where(questionnaire_category: 1).order("questionnaires.created_at").last
  end

end
