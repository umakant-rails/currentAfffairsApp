class Admin::QuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_state_and_quesion_category, only: [:new, :create]
  layout 'admin'

  def new
    @question = Question.new
    get_scrapping_data
    respond_to do |format|
      format.html {}
      format.js {}
      format.json {render json: @scrapping_data}
    end
  end

  def create
    @question = Question.new(question_params)
    if @question.save!
      @question.scrapping_datum.update(is_read: true)
      get_scrapping_data
      respond_to do |format|
        flash[:notice] = 'Question is created successfully.'
        format.html { redirect_to new_admin_question_path}
        format.js {}
      end
    else
      respond_to do |format|
        format.html { render :new }
        format.js { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def get_scrapping_data
      scrapping_data_tmp = ScrappingDatum.where("is_read=false and is_hold=false")
      @scrapping_data = Kaminari.paginate_array(scrapping_data_tmp).page(params[:page]).per(1)
    end

    def set_state_and_quesion_category
      @states = State.all
      @que_categories = QuestionCategory.all
    end

    def question_params
      params.require(:question).permit(:question, :option1, :option2, :option3, :option4, :answer, :keypoints, :facts, :state_id, :question_category_id, :questionnaire_category_id, :questionnaire_id, :scrapping_datum_id)
    end
end

