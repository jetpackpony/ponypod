# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
pod = Podcast.create(
  {
    title: "Hello Internet",
    description: "Such podcast! Much hello! Wow!",
    image: "http://test.png",
    rss_link: "http://www.hellointernet.fm/podcast?format=rss"
  }
)
Episode.create({
  podcast: pod,
  title: "testme",
  mp3_link: "http://dfasdf.com/",
  guid: "this is such guid",
  full_description: "This is such a full description",
  summary: "Small description",
  published_at: DateTime.parse("2015-05-19 23:01:01")
})
