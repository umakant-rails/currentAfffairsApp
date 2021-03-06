class Admin::QuestionnairesController < ApplicationController
  before_action :authenticate_user!
  layout :set_layout
  before_action :set_questionnaire, only: [:show, :edit, :update, :questions_of_questionnaire]

  def index
    questionnaires_tmp = Questionnaire.order("created_at desc")
    @questionnaires = Kaminari.paginate_array(questionnaires_tmp).page(params[:page]).per(1)
  end

  def new
    @questionnaire = Questionnaire.new
  end

  def create
    is_true = false
    is_exist = false
    @questionnaire = Questionnaire.where(name: params[:questionnaire][:name])[0]

    if @questionnaire.blank?
      @questionnaire = Questionnaire.new(questionnaire_params)
      is_true = @questionnaire.save
    else
      is_exist = true
    end

    if is_true
      respond_to do |format|
        flash[:notice] = 'Questionnaire is created successfully.'
        format.html { render :show}
        format.js {}
      end
    elsif is_exist
      respond_to do |format|
        flash[:notice] = 'Questionnaire is already created.'
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

  def edit
  end

  def update
    if @questionnaire.update(questionnaire_params)
      respond_to do |format|
        flash[:notice] = 'Questionnaire updated successfully.'
        format.html { render 'show'}
      end
    else
      format.html { render :edit }
    end
  end

  def add_questions_page
    @questionnaires = Questionnaire.all.order("created_at DESC").last(8)
    @questions = Question.where(questionnaires: nil)
  end

  def add_questions_in_questionnaire
    params[:question_array].each do | question_id |
      @questionnaire = Questionnaire.find(params[:questionnaire_id])
      Question.find(question_id).update_columns({
        questionnaire_id: @questionnaire.id,
        questionnaire_category_id: @questionnaire.questionnaire_category.id
      })
    end
    @questions = Question.where(questionnaires: nil)
    respond_to do |format|
      flash[:notice] = 'Question added successfully in Questionnaire.'
      format.html {}
      format.js{}
    end
  end

  def questions_of_questionnaire
    params[:page] = params[:page].blank? ? 1 : params[:page]
    questions_tmp = @questionnaire.questions
    @questions = Kaminari.paginate_array(questions_tmp).page(params[:page]).per(10)
    respond_to do |format|
      format.html {}
      format.js {}
    end
  end

  private

    def set_questionnaire
      questionnaire_id = params[:questionnaire_id].present? ?  params[:questionnaire_id] : params[:id]
      @questionnaire = Questionnaire.find(questionnaire_id) 
    end

    def questionnaire_params
      params.require(:questionnaire).permit(:name, :questionnaire_category_id)
    end

    def set_layout
      if params[:action] == "questionnaire_presentation"
        return 'presentation'
      elsif params[:action] == "generate_pdf"
        return "pdf"
      else
        return 'admin'
      end
    end

end
