FactoryGirl.define do
  factory :podcast do
    title "Test podcast"
    rss_link { "http://#{title}" }
  end
end
