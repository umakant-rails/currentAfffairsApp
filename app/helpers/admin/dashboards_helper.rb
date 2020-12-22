module Admin::DashboardsHelper
  def is_admin(current_user)
    return (current_user.role_id == 1)
  end
end
