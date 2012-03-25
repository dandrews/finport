class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation
  has_secure_password
  validates_presence_of :password, :on => :create

  has_many :feeds

  serialize :likes
  serialize :dislikes
  serialize :keeps

  def rated?(article)
    ratings = []
    ratings << self.likes << self.dislikes << self.keeps
    if ratings.flatten.include?(article.id)
      true
    else
      false
    end
  end

  def rating(article)
    case
      when self.likes.include?(article.id)
        "You like this article!"
      when self.dislikes.include?(article.id)
        "You dislike this article!"
      when self.keeps.include?(article.id)
        "You kept this article!"
    end
  end

  def like(article)
    self.likes << article.id unless self.likes.include? article.id
  end

  def dislike(article)
    self.dislikes << article.id unless self.dislikes.include? article.id
  end

  def keep(article)
    self.keeps << article.id unless self.keeps.include? article.id
  end

  def likes
    if self[:likes]
      self[:likes]
    else
      self[:likes] = []
      self.save!
      self[:likes]
    end
  end

  def dislikes
    if self[:dislikes]
      self[:dislikes]
    else
      self[:dislikes] = []
      self.save!
      self[:dislikes]
    end
  end

  def keeps
    if self[:keeps]
      self[:keeps]
    else
      self[:keeps] = []
      self.save!
      self[:keeps]
    end
  end
end
