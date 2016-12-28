class PodcastSerializer < ActiveModel::Serializer
  attributes :id, :title, :rss_link, :description, :image
end
