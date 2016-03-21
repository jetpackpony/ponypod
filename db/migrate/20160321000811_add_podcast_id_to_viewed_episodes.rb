class AddPodcastIdToViewedEpisodes < ActiveRecord::Migration
  def change
    add_reference :viewed_episodes, :podcast, index: true, foreign_key: true
  end
end
