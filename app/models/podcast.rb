class Podcast < ActiveRecord::Base
  has_many :episodes, dependent: :destroy

  def self.search(query)
    if query
      where "LOWER(title) LIKE LOWER(:query) OR LOWER(description) LIKE LOWER(:query)", query: "%#{query}%"
    else
      all
    end    
  end

  def search_episodes(query, sort)
    (if query
      episodes
        .where("LOWER(title) LIKE LOWER(:query) OR LOWER(summary) LIKE LOWER(:query)", query: "%#{query}%")
    else
      episodes
    end)
      .order(published_at: sort == 'old-first' ? :asc : :desc)
  end

  def search_episodes_segmented(query, sort, viewed_ids)
    request = episodes
    if query
      request = request.where(
        "LOWER(title) LIKE LOWER(:query) OR LOWER(summary) LIKE LOWER(:query)",
        query: "%#{query}%"
      )
    end
    request = request.order(published_at: sort == 'old-first' ? :asc : :desc)

    {
      new: request.where.not(id: viewed_ids),
      old: request.where(id: viewed_ids)
    }
  end

  # The feed syncronization stuff

  def syncronize
    feed = Feedjira::Feed.parse_with(Feedjira::Parser::ITunesRSS, Faraday.get(rss_link).body)
    self.title = feed.title
    self.description = feed.description
    self.image = feed.itunes_image
    feed.entries.each do |entry|
      episode = self.episodes.find_or_create_by(guid: entry.entry_id) do |ep|
        ep.published_at = Time.now
      end
      episode.title = entry.title
      episode.mp3_link = entry.enclosure_url
      episode.full_description = entry.summary
      episode.summary = Podcast.extract_summary entry.summary
      episode.published_at = DateTime.parse entry.published.to_s
      episode.save!
    end
    save!
    self
  end

  def self.sync
    Podcast.all.each &:syncronize
  end

  def self.extract_summary(summary)
    Podcast.cleanup_text (summary.scan(/<p>(.+)<\/p>/).first || [summary]).first
  end

  def self.cleanup_text(text)
    HTMLEntities.new.decode(Sanitize.fragment(text)).strip
  end
end
