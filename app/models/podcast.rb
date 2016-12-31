class Podcast < ApplicationRecord
  has_many :episodes, dependent: :destroy

  # The feed syncronization stuff

  def self.sync
    Podcast.all.
      map(&:syncronize).
      select { |item| item[:errors].count > 0 }
  end

  def syncronize
    @sync_result = { podcast_id: self.id, errors: [] }
    feed = Feedjira::Feed.parse_with(Feedjira::Parser::ITunesRSS, Faraday.get(rss_link).body)
    self.title = feed.title
    self.description = feed.description
    self.summary = feed.description.slice 0, 200
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
      episode.duration = Podcast.convert_duration entry.itunes_duration
      begin
        episode.save!
      rescue Exception => e
        @sync_result.errors.push "episode #{episode.guid}: #{e.message}"
      end
    end
    begin
      save!
    rescue Exception => e
      @sync_result.errors.push e
    end
    @sync_result
  end

  def self.extract_summary(summary)
    Podcast.cleanup_text (summary.scan(/<p>(.+)<\/p>/).first || [summary]).first
  end

  def self.cleanup_text(text)
    HTMLEntities.new.decode(Sanitize.fragment(text)).strip
  end

  def self.convert_duration(duration)
    m = /^(?:(\d{2}):)?(\d{2}):(\d{2})$/.match duration
    if m
      m[1].to_i * 3600 + m[2].to_i * 60 + m[3].to_i
    else
      0
    end
  end
end
