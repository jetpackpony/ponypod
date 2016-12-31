class EpisodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :mp3_link, :guid, :full_description, :summary, :published_at, :duration
  has_one :podcast
end
