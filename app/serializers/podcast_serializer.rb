class PodcastSerializer < ActiveModel::Serializer
  attributes :id, :title, :rss_link, :description, :summary, :image
  has_many :episodes do
    link :related do
      podcast_episodes_url object
    end
  end

  def episodes
    object.episodes.none
  end
end
