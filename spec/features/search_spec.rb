require "rails_helper"

feature "Search episodes and podcasts |" do
  scenario "User sees matching podcasts, doesn't see not matching podcasts" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Cortex"

    visit root_path
    fill_in "search", with: "hello"
    click_on "Search"

    expect(page).to have_podcast "Hello Internet"
    expect(page).not_to have_podcast "Cortex"
  end

  scenario "User sees matching episodes" do
    hi_podcast = create :podcast, title: "Hello Internet"
    cortex_podcast = create :podcast, title: "Cortex"
    create :episode, title: "First", podcast: hi_podcast
    create :episode, title: "Second", podcast: hi_podcast
    create :episode, title: "Other Podcast", podcast: cortex_podcast

    visit root_path
    click_on "Hello Internet"
    fill_in "search", with: "First"
    click_on "Search"

    expect(page).to have_episode "First"
    expect(page).not_to have_episode "Second"
    expect(page).not_to have_episode "Other Podcast"
  end

  context "Using browser |", js: true do
    scenario "Sorting before search" do
      hi_podcast = create :podcast, title: "Hello Internet"
      create :episode, title: "Three", podcast: hi_podcast, published_at: Time.now
      create :episode, title: "One", podcast: hi_podcast, published_at: 2.days.ago
      create :episode, title: "Two", podcast: hi_podcast, published_at: 1.day.ago
      create :episode, title: "Last Result", podcast: hi_podcast, published_at: Time.now
      create :episode, title: "First Result", podcast: hi_podcast, published_at: 2.days.ago
      create :episode, title: "Middle Result", podcast: hi_podcast, published_at: 1.day.ago

      visit podcast_path hi_podcast
      choose "show old first"
      fill_in "search", with: "Result"
      click_on "Search"

      expect(page).to have_episode "First Result"
      expect(page).to have_episode "Middle Result"
      expect(page).to have_episode "Last Result"
      expect(page).not_to have_episode "One"
      expect(page).not_to have_episode "Two"
      expect(page).not_to have_episode "Three"
      expect(page.body.index("Last Result")).to be > page.body.index("First Result")
      expect(page.body.index("Last Result")).to be > page.body.index("Middle Result")
      expect(page.body.index("Middle Result")).to be > page.body.index("First Result")
    end

    scenario "Sorting after search" do
      hi_podcast = create :podcast, title: "Hello Internet"
      create :episode, title: "Three", podcast: hi_podcast, published_at: Time.now
      create :episode, title: "One", podcast: hi_podcast, published_at: 2.days.ago
      create :episode, title: "Two", podcast: hi_podcast, published_at: 1.day.ago
      create :episode, title: "Last Result", podcast: hi_podcast, published_at: Time.now
      create :episode, title: "First Result", podcast: hi_podcast, published_at: 2.days.ago
      create :episode, title: "Middle Result", podcast: hi_podcast, published_at: 1.day.ago

      visit podcast_path hi_podcast
      fill_in "search", with: "Result"
      click_on "Search"
      choose "show old first"

      expect(page).to have_episode "First Result"
      expect(page).to have_episode "Middle Result"
      expect(page).to have_episode "Last Result"
      expect(page).not_to have_episode "One"
      expect(page).not_to have_episode "Two"
      expect(page).not_to have_episode "Three"
      expect(page.body.index("Last Result")).to be > page.body.index("First Result")
      expect(page.body.index("Last Result")).to be > page.body.index("Middle Result")
      expect(page.body.index("Middle Result")).to be > page.body.index("First Result")
    end

    scenario "Segmentation before search" do
      hi_podcast = create :podcast, title: "Hello Internet"
      create :episode, title: "New one", podcast: hi_podcast
      create :episode, title: "New episode result", podcast: hi_podcast
      viewed_episode = create :episode, title: "Viewed one", podcast: hi_podcast
      viewed_episode_result = create :episode, title: "Viewed episode result", podcast: hi_podcast
      mark_episode_as_viewed viewed_episode
      mark_episode_as_viewed viewed_episode_result

      visit podcast_path hi_podcast
      choose "show unplayed first"
      fill_in "search", with: "Result"
      click_on "Search"

      expect(page).to have_new_episode "New episode result"
      expect(page).to have_viewed_episode "Viewed episode result"
      expect(page).not_to have_episode "New one"
      expect(page).not_to have_episode "Viewed one"
    end

    scenario "Segmentation after search" do
      hi_podcast = create :podcast, title: "Hello Internet"
      create :episode, title: "New one", podcast: hi_podcast
      create :episode, title: "New episode result", podcast: hi_podcast
      viewed_episode = create :episode, title: "Viewed one", podcast: hi_podcast
      viewed_episode_result = create :episode, title: "Viewed episode result", podcast: hi_podcast
      mark_episode_as_viewed viewed_episode
      mark_episode_as_viewed viewed_episode_result

      visit podcast_path hi_podcast
      fill_in "search", with: "Result"
      click_on "Search"
      choose "show unplayed first"

      expect(page).to have_new_episode "New episode result"
      expect(page).to have_viewed_episode "Viewed episode result"
      expect(page).not_to have_episode "New one"
      expect(page).not_to have_episode "Viewed one"
    end
  end
end
