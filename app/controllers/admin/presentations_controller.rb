class Admin::PresentationsController < ApplicationController
  before_action :authenticate_user!
  layout :set_layout

  def index
  end

  def questionniares
    @questionnaires = current_user.questionnaires.order("created_at DESC").first(5)
  end

  def get_questions
    @questionnaire = current_user.questionnaires.find(params[:id])
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

  def questionnaire_pdf
    @questionnaire = current_user.questionnaires.find(params[:id])
    @questions = @questionnaire.questions
    respond_to do |format|
      format.html
      format.pdf do
        render  pdf: @questionnaire.name,   # Excluding ".pdf" extension.
          template: "admin/presentations/questionnaire_pdf.html.erb",
          layout:   "questionnaire_pdf_layout.html.erb",
          margin: {top: 6, bottom: 6, left: 6, right: 6},
          header:  { left:'Xpress Updates', center:'Xpress Updates', 
            right:'Xpress Updates', font_size: 8
          },
          footer:  { left:'Xpress Updates', center:'Xpress Updates', 
            right:'Xpress Updates', font_size: 8
          },
          :show_as_html => false,
          :page_size => "A4"
      end
    end
  end

  def folder_factsheets
    @factsheet_folders = current_user.factsheet_folders.order("created_at DESC").first(5)
  end

  def get_factsheets
    @fs_folder = current_user.factsheet_folders.find(params[:id])
    @factsheets = @fs_folder.factsheets
  end

  def factsheet_folder_pdf
    @factsheet_folder = current_user.factsheet_folders.find(params[:id])
    @factsheets = @factsheet_folder.factsheets
    respond_to do |format|
      format.html
      format.pdf do
        render  pdf: "file_name",   # Excluding ".pdf" extension.
          template: "admin/presentations/factsheet_folder_pdf.html.erb",
          layout:   "factsheet_folder_pdf_layout.html.erb",
          margin: {top: 6, bottom: 6, left: 6, right: 6},
          header:  { left:'Xpress Updates', center:'Xpress Updates', 
            right:'Xpress Updates', font_size: 8
          },
          footer:  { left:'Xpress Updates', center:'Xpress Updates', 
            right:'Xpress Updates', font_size: 8
          },
          :show_as_html => false,
          :page_size => "A4"
      end
    end
  end

  private

    def set_layout
      if params[:action] == "questionnaire_pdf"
        return "questionnaire_pdf_layout"
      elsif params[:action] == "factsheet_folder_pdf"
        return "factsheet_folder_pdf_layout"
      else
        return 'presentation'
      end
    end

end

