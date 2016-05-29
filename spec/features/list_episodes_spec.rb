require 'rails_helper'

feature "List episodes |" do
  scenario "User sees all podcast's episodes on a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    create :episode, title: "Nerds Talk", podcast: hi_podcast
    create :episode, title: "IPad Talk", podcast: hi_podcast

    visit root_path
    click_on hi_podcast.title

    expect(page).to have_podcast "Hello Internet"
    expect(page).to have_episode "Nerds Talk"
    expect(page).to have_episode "IPad Talk"
  end

  scenario "User doesn't see other podcast episodes on a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    cortex_podcast = create :podcast, title: "Cortex"
    create :episode, title: "Other Nerds Talk", podcast: cortex_podcast

    visit podcast_path hi_podcast

    expect(page).not_to have_episode "Other Nerds Talk"
  end

  scenario "User sees newest episodes first" do
    hi_podcast = create :podcast, title: "Hello Internet"
    create :episode, title: "Last", podcast: hi_podcast, published_at: Time.now
    create :episode, title: "First", podcast: hi_podcast, published_at: 2.days.ago
    create :episode, title: "Middle", podcast: hi_podcast, published_at: 1.day.ago

    visit podcast_path hi_podcast

    expect(page.body.index("Last")).to be < page.body.index("First")
    expect(page.body.index("Last")).to be < page.body.index("Middle")
    expect(page.body.index("Middle")).to be < page.body.index("First")
  end

  context "Using browser |", js: true do
    scenario "User sees old episodes first when sorted" do
      hi_podcast = create :podcast, title: "Hello Internet"
      create :episode, title: "Last", podcast: hi_podcast, published_at: Time.now
      create :episode, title: "First", podcast: hi_podcast, published_at: 2.days.ago
      create :episode, title: "Middle", podcast: hi_podcast, published_at: 1.day.ago

      visit podcast_path hi_podcast
      choose "show old first"

      expect(page.body.index("Last")).to be > page.body.index("First")
      expect(page.body.index("Last")).to be > page.body.index("Middle")
      expect(page.body.index("Middle")).to be > page.body.index("First")
    end

    scenario "User sees viewed episodes in a separate section when segmented" do
      hi_podcast = create :podcast, title: "Hello Internet"
      new_episode = create :episode, title: "Nerds Talk", podcast: hi_podcast
      viewed_episode = create :episode, title: "IPad Talk", podcast: hi_podcast
      mark_episode_as_viewed viewed_episode

      visit podcast_path hi_podcast
      choose "show unplayed first"

      expect(page).to have_viewed_episode "IPad Talk"
      expect(page).to have_new_episode "Nerds Talk"
    end
  end
end
