class PagesController < ApplicationController
  def dashboard
  end
  def index
  end
  def access_requested
    UserMailer.request_access(current_user).deliver_now
  end
  def limbforge
    if current_user
      if !current_user.has_access?
        redirect_to request_access_path
      end
    else
      redirect_to unauthenticated_root_path
    end
  end
end
