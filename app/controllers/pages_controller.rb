class PagesController < ApplicationController
  before_filter :check_for_admin,   :only => [:dashboard, :delete_request, :accept_request]
  def dashboard
    @requests = User.where(:access_requested => true)
  end
  def index
  end
  def delete_request
    user = User.find(params[:request])
    user.update_column('access_requested', false)
    redirect_to admin_dashboard_path
  end
  def accept_request
    user = User.find(params[:request])
    user.update_column('has_access', true)
    user.update_column('access_requested', false)
    UserMailer.access_granted(current_user).deliver_now
    redirect_to admin_dashboard_path
  end
  def limbforge
    if current_user
      if !current_user.has_access?
        redirect_to authenticated_root_path
      end
    else
      redirect_to unauthenticated_root_path
    end
  end

  private

  def check_for_admin
    if !current_user.admin
      redirect_to limbforge_path
    end
  end
end
