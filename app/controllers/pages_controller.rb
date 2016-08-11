class PagesController < ApplicationController
  def index
    @pages = Page.all
  end
end
