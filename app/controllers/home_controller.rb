class HomeController < ApplicationController
  def index
    @email = Email.new
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

  def sign_up
    @email = Email.new(params[:email])

    if @email.save
      flash[:notice] = "Successfully subscribed to the mailing list!"
    else
      flash[:notice] = "Sorry, there was an error with your e-mail address."
    end

    redirect_to root_url
  end
end
