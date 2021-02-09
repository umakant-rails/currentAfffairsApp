class Admin::QuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_state_and_quesion_category, only: [:new, :create, :edit]
  layout 'admin'

  def index
    @page = params[:page].blank? ? 0 : params[:page]
    @questionnaires = Questionnaire.order("created_at desc")
    questions_tmp = Question.order("created_at desc")
    @questions = Kaminari.paginate_array(questions_tmp).page(params[:page]).per(10)
  end

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
    @question = Question.where(scrapping_datum_id: params[:question][:scrapping_datum_id])

    if @question.present?
      respond_to do |format|
        flash[:notice] = 'Question is craete already for this data.'
        format.html { redirect_to new_admin_question_path}
        format.js {}
      end
    elsif @question.blank?
      @question = Question.new(question_params)
      @question.scrapping_datum.update(is_read: true) if @question.save
      get_scrapping_data
      respond_to do |format|
        flash[:notice] = 'Question is created successfully.'
        format.html { redirect_to new_admin_question_path}
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
    @question = Question.find(params[:id])
  end
  
  def edit
    @question = Question.find(params[:id])
    @scrapping_datum = @question.scrapping_datum
  end

  def update
    @question = Question.find(params[:id])

    if @question.update(question_params)
      respond_to do |format|
        flash[:notice] = 'Question updated successfully.'
        format.html { render 'show'}
      end
    else
      format.html { render :edit }
    end
  end

  def questions_for_fact
    @questions = Question.where(question_category_id: params[:category_id])
    respond_to do |format|
      format.html {}
      format.js {}
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

