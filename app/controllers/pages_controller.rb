class PagesController < ApplicationController
  def dashboard
  end
  def index
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
end
