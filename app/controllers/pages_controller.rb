class PagesController < ApplicationController
  before_filter :check_for_admin,   :only => [:dashboard, :delete_request, :accept_request]
  before_filter :check_for_session,   :only => [:limbforge]

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
  end

  private

  def check_for_admin
    if !current_user.admin
      redirect_to limbforge_path
    end
  end

  def check_for_session
    if !current_user
      redirect_to new_user_session_path
    end
  end
end
