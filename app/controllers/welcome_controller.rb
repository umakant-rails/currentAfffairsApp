class WelcomeController < ApplicationController
  
  def index 
    if current_user.blank?
      @welcome_msg = "This is welcome page"
    else
      redirect_to home_path
    end
  end

end
