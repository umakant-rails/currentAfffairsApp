class Admin::CurrentAffairsController < ApplicationController
  before_action :authenticate_user!
  layout 'admin'

  def new
    @question = Question.new
    @scrapping_data = ScrappingDatum.all
  end

end
