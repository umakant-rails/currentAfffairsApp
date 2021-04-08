class Admin::FactsheetsController < ApplicationController
  before_action :authenticate_user!
  #layout 'admin'

  def index
    @page = params[:page].blank? ? 0 : params[:page]
    @factsheet_folders = current_user.factsheet_folders.order("created_at desc")
    factsheets_tmp = current_user.factsheets.order("created_at desc")
    @factsheets = Kaminari.paginate_array(factsheets_tmp).page(params[:page]).per(10)
  end

  def new
    @factsheet = current_user.factsheets.new
  end

  def create
    @factsheet = current_user.factsheets.new(factsheet_params)
    @factsheet.save
    respond_to do |format|
      flash[:notice] = 'Factsheet is created successfully.'
      format.html {redirect_to new_admin_factsheet_path}
      format.js {}
    end
  end

  def show
    @factsheet = current_user.factsheets.find(params[:id])
  end

  def edit
    @factsheet = current_user.factsheets.find(params[:id])
    respond_to do |format|
      format.html {}
      format.js {}
      format.json{render json: @factsheet}
    end
  end

  def update
    @factsheet = current_user.factsheets.find(params[:id])

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
    @factsheet = current_user.factsheets.find(params[:id])
    if @factsheet.destroy!
       respond_to do |format|
        flash[:notice] = 'Factsheet deleted successfully.'
        format.html { redirect_to admin_factsheets_path}
      end
    end
  end

  private

  def factsheet_params
    params.require(:factsheet).permit(:title, :description, :user_id)
  end

end
