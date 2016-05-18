require 'rails_helper'

feature "Show episode page |" do
  scenario "User sees correct episode page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    create :episode, title: "Nerds Talk", podcast: hi_podcast, mp3_link: "http://test.com/1.mp3"
    create :episode, title: "IPad Talk", podcast: hi_podcast

    visit root_path
    click_on "Hello Internet"
    click_on "Nerds Talk" 

    expect(page).to have_css ".podcast-title", text: "Hello Internet"
    expect(page).to have_css ".episode-title", text: "Nerds Talk"
    expect(page).to have_css "audio source[src='http://test.com/1.mp3']"
  end
end
