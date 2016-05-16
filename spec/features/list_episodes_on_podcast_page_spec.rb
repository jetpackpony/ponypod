require 'rails_helper'

feature "List episodes on podcast page" do
  scenario "successfully" do
    hi_podcast = create :podcast, title: "Hello Internet"
    create :podcast, title: "Cortex"
    hi_episode = create :episode, title: "Nerds Talk", podcast: hi_podcast

    visit podcast_path hi_podcast

    expect(page).to have_css ".podcast-title", text: "Hello Internet"
    expect(page).not_to have_css ".podcast-title", text: "Cortex"

    expect(page).to have_css ".episode-title", text: "Nerds Talk"
  end
end
