FactoryGirl.define do
  sequence :guid do |n|
    "guid:http://test.com/mp3.mp3-#{n}"
  end
  factory :episode do
    podcast
    guid
    title "Test"
    mp3_link "http://test.com/mp3.mp3"
    full_description "Such episode description"
    summary "Test"
    published_at DateTime.parse "2016-11-11 11:11:11"
    duration 150
  end
end
