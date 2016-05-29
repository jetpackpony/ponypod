class ChangeColumnDefaults2 < ActiveRecord::Migration
  def change
    change_column_default :podcasts, :rss_link, ""
    change_column_default :podcasts, :description, ""
    change_column_default :podcasts, :image, ""

    change_column_default :episodes, :title, ""
    change_column_default :episodes, :mp3_link, ""
    change_column_default :episodes, :guid, ""
    change_column_default :episodes, :full_description, ""
    change_column_default :episodes, :summary, ""
    change_column_null :episodes, :podcast_id, false
    change_column_null :episodes, :published_at, false

    change_column_null :subscriptions, :podcast_id, false
    change_column_null :subscriptions, :user_id, false

    change_column_default :users, :name, ""
    change_column_default :users, :provider, ""
    change_column_default :users, :uid, ""

    change_column_null :viewed_episodes, :user_id, false
    change_column_null :viewed_episodes, :episode_id, false
  end
end
