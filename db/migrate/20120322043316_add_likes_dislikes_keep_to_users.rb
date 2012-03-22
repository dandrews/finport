class AddLikesDislikesKeepToUsers < ActiveRecord::Migration
  def change
    add_column :users, :likes, :text
    add_column :users, :keeps, :text
    add_column :users, :dislikes, :text
  end
end
