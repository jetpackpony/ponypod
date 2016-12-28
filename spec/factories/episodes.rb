FactoryGirl.define do
  factory :episode do
    podcast
    title "Test"
    mp3_link "http://test.com/mp3.mp3"
    guid "guid:http://test.com/mp3.mp3"
    full_description "Such episode description"
    summary "Test"
    published_at "Test"
  end
end
