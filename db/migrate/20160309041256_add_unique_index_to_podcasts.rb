class AddUniqueIndexToPodcasts < ActiveRecord::Migration
  def change
    add_index :podcasts, :rss_link, :unique => true
  end
end
