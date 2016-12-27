class AddDefaultsToPodcasts < ActiveRecord::Migration[5.0]
  def change
    change_column_default :podcasts, :title, ""
    change_column_default :podcasts, :rss_link, ""
    change_column_default :podcasts, :description, ""
    change_column_default :podcasts, :image, ""
  end
end
