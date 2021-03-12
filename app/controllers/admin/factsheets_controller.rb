class Admin::FactsheetsController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'

  def index
    @page = params[:page].blank? ? 0 : params[:page]
    @questionnaires = Questionnaire.order("created_at desc")
    factsheets_tmp = Factsheet.order("created_at desc")
    @factsheets = Kaminari.paginate_array(factsheets_tmp).page(params[:page]).per(10)
  end

  def new
    @factsheet = Factsheet.new
  end

  def create
    @factsheet = Factsheet.new(factsheet_params)
    @factsheet.save
    respond_to do |format|
      flash[:notice] = 'Factsheet is created successfully.'
      format.html {redirect_to new_admin_factsheet_path}
      format.js {}
    end
  end

  def show
    @factsheet = Factsheet.find(params[:id])
  end

  def edit
    @factsheet = Factsheet.find(params[:id])
    respond_to do |format|
      format.html {}
      format.js {}
      format.json{render json: @factsheet}
    end
  end

  def update
    @factsheet = Factsheet.find(params[:id])

    if @factsheet.update(factsheet_params)
      respond_to do |format|
        flash[:notice] = 'Factsheet updated successfully.'
        format.html { render 'show'}
      end
    else
      format.html { render :edit }
    end
  end

  def destroy
    @factsheet = Factsheet.find(params[:id])
    if @factsheet.destroy!
       respond_to do |format|
        flash[:notice] = 'Factsheet deleted successfully.'
        format.html { redirect_to admin_factsheets_path}
      end
    end
  end

  def add_factsheet_page
  end
  
  private

  def factsheet_params
    params.require(:factsheet).permit(:title, :description)
  end

end
