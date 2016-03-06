class Podcast < ActiveRecord::Base
  has_many :episodes, dependent: :destroy

  # The feed syncronization stuff
  def self.syncronize
    self.all
    .select do |podcast|
      podcast.rss_link.to_s != ""
    end
    .each do |podcast|
      feed = Feedjira::Feed.fetch_and_parse podcast.rss_link
      byebug
      podcast.sync Feedjira::Feed.fetch_and_parse podcast.rss_link
    end
  end

  def sync(feed)
    self.title = feed.title
    feed.entries.each do |entry|
      episode = self.episodes.find_or_create_by(guid: entry.entry_id)
      episode.title = entry.title
      episode.mp3_link = Podcast.get_mp3_url entry
      episode.save!
    end
    self.save!
  end

  def self.get_mp3_url(entry)
    entry[ 
      [:image, :enclosure_url].find do |method|
        entry.respond_to? method
      end
    ]
  end
end
