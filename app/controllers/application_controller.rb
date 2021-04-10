class ApplicationController < ActionController::Base
  layout :set_layouts

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

  private
    def set_layouts
      if current_user.present? && current_user.is_super_admin
        return 'super_admin'
      elsif current_user.present? && current_user.is_admin
        return 'admin'
      else
        return 'application'
      end
    end
end
