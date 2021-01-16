class Admin::QuestionnairesController < ApplicationController
  before_action :authenticate_user!
  #layout 'admin', only: [:new, :create, :show, :add_questions_page, :get_questions, :add_questions_in_questionnaire, ]
  #layout 'presentation', only: [:questionnaire_presentation]
  layout :set_layout

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

  def add_questions_page
    @questionnaires = Questionnaire.all.order("created_at DESC").last(8)
    @questions = Question.where(questionnaires: nil)
  end

  def get_questions
    @questionnaire = Questionnaire.find(params[:questionnaire_id])
    @questions = @questionnaire.questions
    respond_to do |format|
      format.html {}
      if params[:is_presentation] == "true"
        format.js{}
      else
        format.js{render json: @questions}
      end
    end
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

  def questionnaire_presentation
    @questionnaires = Questionnaire.all.order("created_at DESC").last(5)
  end

  private

    def questionnaire_params
      params.require(:questionnaire).permit(:name, :questionnaire_category_id)
    end

    def set_layout
      if params[:action] == "questionnaire_presentation"
        return 'presentation'
      else
        return 'admin'
      end
    end

end
