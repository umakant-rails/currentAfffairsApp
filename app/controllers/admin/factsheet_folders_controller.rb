class Admin::FactsheetFoldersController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'
  before_action :set_factsheet_folder, only: [:show, :edit, :update, :destroy]

  # GET /admin/factsheet_folders
  # GET /admin/factsheet_folders.json
  def index
    @page = params[:page].blank? ? 0 : params[:page]
    
    fs_factsheets_tmp = FactsheetFolder.order("created_at desc")
    @factsheet_folders = Kaminari.paginate_array(fs_factsheets_tmp).page(params[:page]).per(10)
  end

  # GET /admin/factsheet_folders/1
  # GET /admin/factsheet_folders/1.json
  def show
  end

  # GET /admin/factsheet_folders/new
  def new
    @factsheet_folder = FactsheetFolder.new
  end

  # GET /admin/factsheet_folders/1/edit
  def edit
  end

  # POST /admin/factsheet_folders
  # POST /admin/factsheet_folders.json
  def create
    @factsheet_folder = FactsheetFolder.new(factsheet_folder_params)

    respond_to do |format|
      if @factsheet_folder.save
        format.html { redirect_to admin_factsheet_folders_path, notice: 'Factsheet folder was successfully created.' }
        format.json { render :show, status: :created, location: @factsheet_folder }
      else
        format.html { render :new }
        format.json { render json: @factsheet_folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/factsheet_folders/1
  # PATCH/PUT /admin/factsheet_folders/1.json
  def update
    respond_to do |format|
      if @factsheet_folder.update(factsheet_folder_params)
        format.html { redirect_to admin_factsheet_folder_path(@factsheet_folder), notice: 'Factsheet folder was successfully updated.' }
        format.json { render :show, status: :ok, location: @factsheet_folder }
      else
        format.html { render :edit }
        format.json { render json: @factsheet_folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/factsheet_folders/1
  # DELETE /admin/factsheet_folders/1.json
  def destroy
    @factsheet_folder.destroy
    respond_to do |format|
      format.html { redirect_to admin_factsheet_folders_url, notice: 'Factsheet folder was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def add_factsheet_page
    @added_factsheets = nil
    @factsheet_folders = nil;
    if params[:filter].present?
      if params[:filter] == "blank folder"
        @factsheet_folders = FactsheetFolder.without_factsheet
      else
        @factsheet_folders = FactsheetFolder.all.order("created_at DESC").last(20)
      end
    else
      @factsheet_folders = FactsheetFolder.all.order("created_at DESC").last(10)
    end
    @factsheets = Factsheet.where(factsheet_folder_id: nil)

    respond_to do |format|
      format.html {}
      format.js{}
      format.json{render json: @factsheet_folders}
    end
  end
  
  def add_factsheets_in_folder
    factsheet_updation if params[:updation_allowed] == "true"
    @factsheet_folder = FactsheetFolder.find(params[:id])
    @factsheets = Factsheet.where(factsheet_folder_id: nil)
    @added_factsheets = @factsheet_folder.factsheets
    respond_to do |format|
      flash[:notice] = 'Factsheet added successfully in Factsheet Folder.'
      format.html {}
      format.js{}
    end
  end

  private

    def factsheet_updation
      @factsheet_folder = FactsheetFolder.find(params[:id])
      @factsheet_folder.factsheets.each do | fs |
        fs.update_columns({factsheet_folder_id: nil})
      end
      params[:factsheet_arry].each do | factsheet_id |
        Factsheet.find(factsheet_id).update_columns({
          factsheet_folder_id: @factsheet_folder.id
        })
      end
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_factsheet_folder
      @factsheet_folder = FactsheetFolder.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def factsheet_folder_params
      params.require(:factsheet_folder).permit(:name, :questionnaire_category_id)
    end
end
