class Admin::PresentationsController < ApplicationController
  before_action :authenticate_user!
  layout :set_layout

  def index
    @questionnaires = Questionnaire.all.order("created_at DESC").first(5)
  end

  def get_questions
    @questionnaire = Questionnaire.find(params[:presentation_id])
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

  def generate_pdf
    @questionnaire = Questionnaire.find(params[:presentation_id])
    @questions = @questionnaire.questions
    respond_to do |format|
      format.html
      format.pdf do
        render  pdf: "file_name",   # Excluding ".pdf" extension.
          template: "admin/presentations/generate_pdf.html.erb",
          layout:   "pdf.html.erb",
          :page_size => "A4"
      end
    end
  end


  private

    def set_layout
      if params[:action] == "generate_pdf"
        return "pdf"
      else
        return 'presentation'
      end
    end

end

