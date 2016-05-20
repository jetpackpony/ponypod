require "rails_helper"

feature "Mark episode as viewed |" do
  scenario "Mark episode as viewed" do
    hi_podcast = create :podcast, title: "Hello Internet"
    episode = create :episode, title: "Nerds Talk", podcast: hi_podcast

    sign_in
    visit episode_path episode
    click_on "Mark as viewed"

    expect(page).to display_viewed_episode "Nerds Talk"
  end
  
  scenario "Mark episode as new" do
    hi_podcast = create :podcast, title: "Hello Internet"
    episode = create :episode, title: "Nerds Talk", podcast: hi_podcast

    mark_episode_as_viewed episode
    visit episode_path episode
    click_on "Mark as new"

    expect(page).to display_new_episode "Nerds Talk"
  end
end
