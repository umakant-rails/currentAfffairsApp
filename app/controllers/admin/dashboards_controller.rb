class Admin::DashboardsController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'

  def index
    @questions = Question.order("created_at desc").first(5)
    @scrapping_data = ScrappingDatum.where("is_read=false and is_hold=false").order("created_at desc").first(5)
  end
  
end
