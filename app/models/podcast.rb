class Podcast < ActiveRecord::Base
  has_many :episodes, dependent: :destroy

  def self.search(query)
    if query
      where "LOWER(title) LIKE LOWER(:query) OR LOWER(description) LIKE LOWER(:query)", query: "%#{query}%"
    else
      all
    end    
  end

  def search_episodes(query)
    (if query
      episodes
        .where("LOWER(title) LIKE LOWER(:query) OR LOWER(summary) LIKE LOWER(:query)", query: "%#{query}%")
    else
      episodes
    end)
      .order(published_at: :desc)
  end


  # The feed syncronization stuff
  def self.syncronize
    self.all
    .select do |podcast|
      podcast.rss_link.to_s != ""
    end
    .each do |podcast|
      feed = Feedjira::Feed.parse_with(Feedjira::Parser::ITunesRSS, Faraday.get(podcast.rss_link).body)
      podcast.sync feed
    end
  end

  def sync(feed)
    self.title = feed.title
    self.description = feed.description
    self.image = feed.itunes_image
    feed.entries.each do |entry|
      episode = self.episodes.find_or_create_by(guid: entry.entry_id)
      episode.title = entry.title
      episode.mp3_link = entry.enclosure_url
      episode.full_description = entry.summary
      episode.summary = Podcast.extract_summary entry.summary
      episode.published_at = Podcast.convert_date entry.published
      episode.save!
    end
    self.save!
  end

  def self.extract_summary(summary)
    Podcast.cleanup_text (summary.scan(/<p>(.+)<\/p>/).first || [summary]).first
  end

  def self.cleanup_text(text)
    HTMLEntities.new.decode(Sanitize.fragment(text)).strip
  end

  def self.convert_date(xml_date)
    DateTime.parse xml_date.to_s
  end
end
