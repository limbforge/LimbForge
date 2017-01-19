class PagesController < ApplicationController
  http_basic_authenticate_with name: ENV["HTTP_USER"], password: ENV["HTTP_PASS"]
  def dashboard
  end
  def index
  end
  def limbforge
  end
end
