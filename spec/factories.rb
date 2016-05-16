FactoryGirl.define do
  factory :podcast do
    title "Test podcast"
    sequence(:rss_link) { |n| "http://someaddress.com/#{n}" }
  end

  factory :episode do
    podcast
    title "Test episode"
    sequence(:guid) { |n| "http://episode-#{n}" }
    published_at Time.now
  end
end
