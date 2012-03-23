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

  def self.create_articles
    rss = SimpleRSS.parse open('http://news.yahoo.com/rss/personal-finance')
    rss.items.each do |item|
      link_url = item.link
      doc = Pismo::Document.new(link_url)
      Article.create(title: doc.title, content: doc.body, written_date: doc.datetime, source: link_url)
    end
  end
end
