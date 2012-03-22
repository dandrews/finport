class Article < ActiveRecord::Base
  def published_at
    created_at.strftime("%b %d, %Y, %l:%M%p %Z") #replace with published at date later
  end

  def feature_content
    article_content[0,200]
  end

  def read_more_content
    article_content[200, article_content.length]
  end

  def article_content
    @content ||= self.content
  end

  def next
    articles = Article.where("id > ?", self.id)
    if articles.empty?
      Article.order("id ASC").first
    else
      articles.first
    end
  end

  def previous
    articles = Article.where("id < ?", self.id)
    if articles.empty?
      Article.order("id DESC").first
    else
      articles.last
    end
  end
end
