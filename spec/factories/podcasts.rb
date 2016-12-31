FactoryGirl.define do
  sequence :rss_link do |n|
    "http://test.feed/feed.xml-#{n}"
  end
  factory :podcast do
    title "Test podcast"
    rss_link
    description "Test podcast description"
    summary "Test podast summary"
    image "http://img.png/"
  end
end
