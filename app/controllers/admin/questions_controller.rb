class Admin::QuestionsController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'

  def new
    @question = Question.new
    @states = State.all
    @que_categories = QuestionCategory.all
    @scrapping_data = ScrappingDatum.all
  end

end

