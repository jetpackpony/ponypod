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
end
