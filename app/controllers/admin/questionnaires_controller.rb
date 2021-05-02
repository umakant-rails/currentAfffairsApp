class Admin::QuestionnairesController < ApplicationController
  before_action :authenticate_user!
  #layout 'admin'
  before_action :set_questionnaire, only: [:show, :edit, :update, :questions_of_questionnaire]

  def index
    questionnaires_tmp = current_user.questionnaires.order("created_at desc")
    @questionnaires = Kaminari.paginate_array(questionnaires_tmp).page(params[:page]).per(10)
  end

  def new
    @questionnaire = current_user.questionnaires.new
  end

  def create
    is_true = false
    is_exist = false
    @questionnaire = current_user.questionnaires.where(name: params[:questionnaire][:name])[0]

    if @questionnaire.blank?
      @questionnaire = current_user.questionnaires.new(questionnaire_params)
      is_true = @questionnaire.save
      flash[:notice] = 'Questionnaire is created successfully.'
    else
      is_exist = true
      flash[:notice] = 'Questionnaire is already created.'
    end
    respond_to do |format|
      if is_true || is_exist
        format.html {render :show}
      else
        format.html{render :new}
      end
      #format.html { render (is_true || is_exist ) ? :show : :new }
      format.js {}
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
    @questions=[], @added_questions= []
    @questionnaires = current_user.questionnaires.order("created_at DESC").first(10)
    @que_categories = QuestionCategory.all
    from_date = params[:from_date].present? ? params[:from_date].to_date : nil 
    to_date = params[:to_date].present? ? params[:to_date].to_date : nil

    if params[:questionnaire_id].present?
      @added_questions = current_user.questionnaires.find(params[:questionnaire_id]).questions
    end

    if from_date.present? && to_date.present? && params[:question_category_id].present?
      @questions =  current_user.questions.joins(:question_category_questions).where("question_category_questions.question_category_id = ? and questions.created_at between ? and ?", params[:question_category_id], from_date, to_date)
    elsif from_date.present? && to_date.present?
      @questions =  current_user.questions.joins(:question_category_questions).where("question_category_questions.created_at between ? and ?", from_date, to_date)
    else 
      @questions =  current_user.questions.includes(:questionnaires).where(questionnaires: {id: nil})
    end

    @questions = @questions - @added_questions

    respond_to do |format|
      format.html {}
      format.js{}
    end
  end

  def add_questions_in_questionnaire
    if(params[:action_type] == "addition")
      add_questions
    elsif(params[:action_type] == "removal")
      remove_questions
    end
    @added_questions = current_user.questionnaires.find(params[:id]).questions
    #@questions = Question.where(questionnaires: nil)
    @questions =  current_user.questions.includes(:questionnaires).where(questionnaires: {id: nil})
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

  def destroy
    @questionnaire = current_user.questionnaires.find(params[:id])
    if @questionnaire.destroy!
       respond_to do |format|
        flash[:notice] = 'Questionnaire deleted successfully.'
        format.html { redirect_to admin_questionnaires_path}
      end
    end
  end

  private

    def add_questions
      @questionnaire = current_user.questionnaires.find(params[:id])
      params[:question_array].each do | ques_id |
        is_blank = @questionnaire.questionnaire_questions.where(question_id: ques_id).blank?
        if is_blank
          blnk_questnre_question = @questionnaire.questionnaire_questions.where(question_id: nil)
          if blnk_questnre_question.present?
            blnk_questnre_question[0].update_columns({question_id: ques_id})
          else
            @questionnaire.questionnaire_questions.create({question_id: ques_id})
          end
        end
        #Question.find(question_id).update_columns({
        #  questionnaire_id: @questionnaire.id,
        #  questionnaire_category_id: @questionnaire.questionnaire_category.id
        #})
      end
    end

    def remove_questions
      @questionnaire = current_user.questionnaires.find(params[:id])
      params[:question_array].each do | question_id |
        questnre_question = @questionnaire.questionnaire_questions.where(question_id: question_id)
        if questnre_question.present?
          questnre_question[0].update_columns({question_id: nil})
        end
        #QuestionnaireQuestion.where(question_id)
        #Question.find(question_id).update_columns({questionnaire_id: nil})
      end
    end

    def set_questionnaire
      questionnaire_id = params[:questionnaire_id].present? ?  params[:questionnaire_id] : params[:id]
      @questionnaire = current_user.questionnaires.find(questionnaire_id) 
    end

    def questionnaire_params
      params.require(:questionnaire).permit(:name, :questionnaire_category_id, :user_id)
    end
end
