class AddWrittenDateToArticles < ActiveRecord::Migration
  def up
    add_column :articles, :written_date, :datetime
  end

  def down
    remove_column :articles, :written_date
  end
end
