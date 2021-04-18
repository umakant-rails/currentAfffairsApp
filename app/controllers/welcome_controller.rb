class WelcomeController < ApplicationController
  
  def index 
    if current_user.blank?
      @questionnaires = Questionnaire.all
      @questionnaire = Questionnaire.joins(:questions).where(questionnaire_category: 1).order("questionnaires.created_at").last
    else
      redirect_to home_path
    end
  end

end
