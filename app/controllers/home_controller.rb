class HomeController < ApplicationController
  def index
    render :layout => 'finport'
  end

  def alt_index
  end

  def news_feed
    redirect_to root_url unless current_user
  end

  def ofeedia
  end
end
