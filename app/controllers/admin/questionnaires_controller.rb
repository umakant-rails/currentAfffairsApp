class Admin::QuestionnairesController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'

  def new
    @questionnaire = Questionnaire.new
  end

  def create
    @questionnaire = Questionnaire.new(questionnaire_params)
    if @questionnaire.save
      respond_to do |format|
        flash[:notice] = 'Questionnaire is created successfully.'
        format.html { render :show}
        format.js {}
      end
    else
      respond_to do |format|
        format.html { render :new }
        format.js {}
      end
    end
  end

  def show
  end

  private

    def questionnaire_params
      params.require(:questionnaire).permit(:name, :questionnaire_category_id)
    end

end
