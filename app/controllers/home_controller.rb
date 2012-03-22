class HomeController < ApplicationController
  def index
    render :layout => 'finport'
  end

  def alt_index
  end

  def news_feed
    if params[:article_id]
      @article = Article.find_by_id(params[:article_id])
    else
      @article = Article.first
    end

    redirect_to root_url unless current_user
  end

  def ofeedia
  end
end
