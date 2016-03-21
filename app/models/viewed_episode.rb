class ViewedEpisode < ActiveRecord::Base
  belongs_to :user
  belongs_to :episode

  def self.get_for_user_and_podcast(user_id, podcast_id)
    ViewedEpisode
      .where(user_id: user_id, podcast_id: podcast_id)
      .select(:episode_id)
      .map do |item| item[:episode_id] end
  end
end
