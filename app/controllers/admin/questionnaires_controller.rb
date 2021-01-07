class Admin::QuestionnairesController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'

  def new
    @questionnaire = Questionnaire.new
  end

  def create
  
  end

end
