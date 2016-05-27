desc "This task is called by the Heroku scheduler add-on"
task :update_episodes => :environment do
  puts "Updating Episode list..."
  Podcast.sync
  puts "done."
end
