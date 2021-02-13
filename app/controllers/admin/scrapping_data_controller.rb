class Admin::ScrappingDataController < ApplicationController
  before_action :authenticate_user!
  before_action :set_scrapping_datum, only: [:show, :edit, :update, :destroy]
  layout 'admin'
  # GET /scrapping_data
  # GET /scrapping_data.json
  def index
    scrapper = ScrappingDatum.new
    scrapping_data_tmp = ScrappingDatum.where("is_read=false and is_hold=false")
    @scrapping_data = Kaminari.paginate_array(scrapping_data_tmp).page(params[:page]).per(1)
  end

  def scrap_data
    scrapper = ScrappingDatum.new
    @scrapping_notice = ''

    if (params[:data_source] == "banker_adda")
      @scrapping_data = scrapper.ca_from_banker_adda
      scrapper.save_scrap_data(@scrapping_data, "banker_adda")
      @scrapping_notice = "Successfully fetch data from Banker adda."
    elsif (params[:data_source] == "adda_247")
      @scrapping_data = scrapper.ca_from_adda_247
      scrapper.save_scrap_data(@scrapping_data, "adda_247")
      @scrapping_notice = "Successfully fetch data from 247 adda."
    elsif (params[:data_source] == "byscoop")
      @scrapping_data = scrapper.ca_from_byscoop
      scrapper.save_scrap_data(@scrapping_data, "byscoop")
      @scrapping_notice = "Successfully fetch data from byscoop."
    elsif (params[:data_source] == "pendulum_edu")
      @scrapping_data = scrapper.ca_from_pendulum
      scrapper.save_scrap_data(@scrapping_data, "pendulum_edu")
      @scrapping_notice = "Successfully fetch data from Pendulum Education."
    else
      @scrapping_data = []
    end

    respond_to do |format|
      format.html { redirect_to @scrapping_data, notice: @scrapping_notice }
      format.js {}
      format.json {render json: @scrapping_data}
    end
  end
  
  def unread
    @scrapping_data = ScrappingDatum.where("is_read=false and is_hold=false")
  end

  def mark_as_hold_or_read
    is_updated = false
    @scrapping_datum = ScrappingDatum.find(params[:id])

    if(params[:action_type].downcase == "mark as hold")
      is_updated = @scrapping_datum.update(is_hold: true)
    else
      is_updated = @scrapping_datum.update(is_read: true)
    end
    respond_to do |format|
      format.json {render json: {status: is_updated}}
    end
  end

  # GET /scrapping_data/1
  # GET /scrapping_data/1.json
  def show
  end

  # GET /scrapping_data/new
  def new
    @scrapping_datum = ScrappingDatum.new
  end

  # GET /scrapping_data/1/edit
  def edit
  end

  # POST /scrapping_data
  # POST /scrapping_data.json
  def create
    @scrapping_datum = ScrappingDatum.new(scrapping_datum_params)

    respond_to do |format|
      if @scrapping_datum.save
        format.html { redirect_to @scrapping_datum, notice: 'Scrapping datum was successfully created.' }
        format.json { render :show, status: :created, location: @scrapping_datum }
      else
        format.html { render :new }
        format.json { render json: @scrapping_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /scrapping_data/1
  # PATCH/PUT /scrapping_data/1.json
  def update
    respond_to do |format|
      if @scrapping_datum.update(scrapping_datum_params)
        format.html { redirect_to @scrapping_datum, notice: 'Scrapping datum was successfully updated.' }
        format.json { render :show, status: :ok, location: @scrapping_datum }
      else
        format.html { render :edit }
        format.json { render json: @scrapping_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /scrapping_data/1
  # DELETE /scrapping_data/1.json
  def destroy
    @scrapping_datum.destroy
    respond_to do |format|
      format.html { redirect_to scrapping_data_url, notice: 'Scrapping datum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_scrapping_datum
    @scrapping_datum = ScrappingDatum.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def scrapping_datum_params
    params.fetch(:scrapping_datum, {})
  end

end
