class Podcast < ActiveRecord::Base
  has_many :episodes

  def self.syncronize
    self.all
    .select do |podcast|
      podcast.rss_link.to_s != ""
    end
    .each do |podcast|
      puts podcast.rss_link
    end 
  end
end
