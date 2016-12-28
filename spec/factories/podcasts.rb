FactoryGirl.define do
  factory :podcast do
    title "Test podcast"
    rss_link "http://test.feed/feed.xml"
    description "Test podcast description"
    image "http://img.png/"
  end
end
