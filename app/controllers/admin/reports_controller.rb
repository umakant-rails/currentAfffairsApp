class Admin::ReportsController < ApplicationController
  layout 'admin'

  def question_reports
    @que_categories = QuestionCategory.all
    from_date = params[:from_date].present? ? params[:from_date].to_date : nil 
    to_date = params[:to_date].present? ? params[:to_date].to_date : nil
    @questions = nil 

    if from_date.present? && to_date.present? && params[:question_category_id].present?
      @questions = Question.joins(:question_category_questions).where("question_category_questions.question_category_id = ? and questions.created_at between ? and ?", params[:question_category_id], from_date, to_date)
    elsif from_date.present? && to_date.present?
      @questions =  Question.joins(:question_category_questions).where("questions.created_at between ? and ?", from_date, to_date)
    elsif params[:question_category_id].present?
      @questions =  Question.joins(:question_category_questions).where(question_category_questions: {question_category_id:  params[:question_category_id]})
    else 
      @questions =  Question.joins(:question_category_questions)
    end 
    @questions_tmp = Kaminari.paginate_array(@questions).page(params[:page]).per(10)
  end

  def factsheet_reports
  end

end
