require 'rails_helper'

feature "List episodes |" do
  scenario "User sees all podcast's episodes on a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    create :episode, title: "Nerds Talk", podcast: hi_podcast
    create :episode, title: "IPad Talk", podcast: hi_podcast

    visit podcast_path hi_podcast

    expect(page).to have_css ".podcast-title", text: "Hello Internet"
    expect(page).to have_css ".episode-title", text: "Nerds Talk"
    expect(page).to have_css ".episode-title", text: "IPad Talk"
  end

  scenario "User doesn't see other podcast episodes on a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    cortex_podcast = create :podcast, title: "Cortex"
    create :episode, title: "Other Nerds Talk", podcast: cortex_podcast

    visit podcast_path hi_podcast

    expect(page).not_to have_css ".episode-title", text: "Other Nerds Talk"
  end

  scenario "User sees newest episodes first" do
    hi_podcast = create :podcast, title: "Hello Internet"
    create :episode, title: "Today episode", podcast: hi_podcast, published_at: Time.now
    create :episode, title: "Yesterday episode", podcast: hi_podcast, published_at: 1.day.ago

    visit podcast_path hi_podcast

    expect(page.body.index("Today episode")).to be < page.body.index("Yesterday episode")
  end

  context "Using browser |", js: true do
    scenario "User sees old episodes first when sorted" do
      hi_podcast = create :podcast, title: "Hello Internet"
      create :episode, title: "Today episode", podcast: hi_podcast, published_at: Time.now
      create :episode, title: "Yesterday episode", podcast: hi_podcast, published_at: 1.day.ago

      visit podcast_path hi_podcast
      choose "show old first"

      expect(page.body.index("Today episode")).to be > page.body.index("Yesterday episode")
    end
  end
end
