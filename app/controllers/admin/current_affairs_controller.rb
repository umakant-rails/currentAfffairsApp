class Admin::CurrentAffairsController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'

  def new
    @questionnaire = Questionnaire.new
  end

end
