class ApplicationController < ActionController::Base

  def after_sign_in_path_for(resource)
    if resource.present? && (resource.role_id == 1)
      admin_dashboards_path
    else
      admin_dashboards_path
      #home_path
    end
  end

  def after_sign_out_path_for(resource)
    root_path
  end

end
