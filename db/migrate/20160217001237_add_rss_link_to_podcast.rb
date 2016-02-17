class AddRssLinkToPodcast < ActiveRecord::Migration
  def change
    add_column :podcasts, :rss_link, :string
  end
end
