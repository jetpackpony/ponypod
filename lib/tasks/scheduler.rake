desc "This task is called by the Heroku scheduler add-on"
task :update_episodes => :environment do
  puts "Updating Episode list..."
  results = Podcast.sync
  puts "done."
  results.each do |res|
    puts "Start errors for #{res.podcast_id}"
    res[:errors].each do |err|
      puts err
    end
    puts "End errors for #{res.podcast_id}"
  end
end
