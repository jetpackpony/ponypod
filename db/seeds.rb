# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Podcast.create([
  { rss_link: 'http://www.hellointernet.fm/podcast?format=rss' },
  { rss_link: 'http://www.howstuffworks.com/podcasts/stuff-you-should-know.rss' },
  { rss_link: 'http://feeds.feedburner.com/freakonomicsradio' },
  { rss_link: 'http://podster.fm/rss.xml?pid=313' },
  { rss_link: 'http://atp.fm/episodes?format=rss' },
  { rss_link: 'http://golangshow.com/index.xml' }
])
