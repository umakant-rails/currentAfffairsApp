class Admin::QuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_state_and_quesion_category, only: [:new, :create, :edit]
  #layout 'admin'

  def index
    @page = params[:page].blank? ? 0 : params[:page]
    @questionnaires = current_user.questionnaires.order("created_at desc")
    questions_tmp = current_user.questions.order("created_at desc")
    @questions = Kaminari.paginate_array(questions_tmp).page(params[:page]).per(10)
  end

  def new
    @question = Question.new
    @question.question_category_questions.build

    get_scrapping_data if current_user.is_super_admin
    respond_to do |format|
      format.html {}
      format.js {}
      format.json {render json: @scrapping_data}
    end
  end

  def create
    @question = current_user.questions.new(question_params)
    @question.scrapping_datum.update(is_read: true) if @question.save && @question.scrapping_datum.present?
    get_scrapping_data
    respond_to do |format|
      flash[:notice] = 'Question is created successfully.'
      format.html { redirect_to new_admin_question_path}
      format.js {}
    end
  end

  def show
    @question = current_user.questions.find(params[:id])
  end
  
  def edit
    @question = current_user.questions.find(params[:id])
    @scrapping_datum = current_user.is_super_admin ? @question.scrapping_datum : nil
  end

  def update
    @question = current_user.questions.find(params[:id])

    if @question.update(question_params)
      respond_to do |format|
        flash[:notice] = 'Question updated successfully.'
        format.html { render 'show'}
      end
    else
      redirect_to edit_admin_question_path(params[:id])
    end
  end

  def questions_for_fact
    #@questions = Question.where(question_category_id: params[:category_id])
    @questions = current_user.questions.joins(:question_category_questions).where(question_category_questions: {question_category_id:  params[:category_id]})
    respond_to do |format|
      format.html {}
      format.js {}
    end
  end

  def destroy
    @question = current_user.questions.find(params[:id])
    if @question.destroy!
       respond_to do |format|
        flash[:notice] = 'Question deleted successfully.'
        format.html { redirect_to admin_questions_path}
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
      params.require(:question).permit(:question, :option1, :option2, :option3, :option4, :answer, :keypoints, :facts, :state_id, :scrapping_datum_id, :user_id, question_category_questions_attributes: [:id, :question_category_id, :question_id, :_destroy])
    end
end

