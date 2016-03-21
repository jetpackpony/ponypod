class Episode < ActiveRecord::Base
  belongs_to :podcast

  def mark_viewed_by(user_id)
    ViewedEpisode.find_or_create_by(episode_id: self.id, podcast_id: self.podcast_id, user_id: user_id)
  end

  def mark_new_by(user_id)
    status = ViewedEpisode.find_by(episode_id: self.id, user_id: user_id)
    status.destroy if status
  end

  def is_viewed_by(user_id)
    ViewedEpisode.find_by(episode_id: self.id, user_id: user_id) != nil
  end
end
