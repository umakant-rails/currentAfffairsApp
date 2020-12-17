class ApplicationController < ActionController::Base

  def after_sign_in_path_for(resource)
    home_path
  end

  def after_sign_out_path_for(resource)
    if @user.blank?
       root_path
    else
       home_path
    end
  end

end
