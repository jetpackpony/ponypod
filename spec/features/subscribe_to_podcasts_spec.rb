require "rails_helper"

feature "Subscribe to podcasts |" do
  scenario "Subscribe from home page" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Cortex"

    sign_in
    subscribe_to "Hello Internet"

    expect(page).to have_css "[data-podcast='Hello Internet'] a.unsubscribe"
    expect(page).not_to have_css "[data-podcast='Cortex'] a.unsubscribe"
  end

  scenario "Subscribe from a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"

    sign_in
    visit podcast_path hi_podcast
    find("a.subscribe").click

    expect(page).to have_css "a.unsubscribe"
  end

  scenario "Subscribe from an episode page" do 
    hi_podcast = create :podcast, title: "Hello Internet"
    episode = create :episode, podcast: hi_podcast

    sign_in
    visit episode_path episode
    find("a.subscribe").click

    expect(page).to have_css "a.unsubscribe"
  end

  scenario "Unsubscribe from home page" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Cortex"
    
    sign_in
    subscribe_to "Hello Internet"
    subscribe_to "Cortex"

    visit root_path
    find("[data-podcast='Hello Internet'] a.unsubscribe").click

    expect(page).to have_css "[data-podcast='Hello Internet'] a.subscribe"
    expect(page).not_to have_css "[data-podcast='Cortex'] a.subscribe"
  end

  scenario "Unsubscribe from a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    
    sign_in
    subscribe_to "Hello Internet"

    visit podcast_path hi_podcast
    find("a.unsubscribe").click

    expect(page).to have_css "a.subscribe"
  end

  scenario "Unsubscribe from an episode page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    episode = create :episode, podcast: hi_podcast

    sign_in
    subscribe_to "Hello Internet"

    visit episode_path episode
    find("a.unsubscribe").click

    expect(page).to have_css "a.subscribe"
  end

  scenario "List podcasts user subscribed to" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Cortex"
    create :podcast, title: "Stuff You Should Know"

    sign_in
    subscribe_to "Hello Internet"
    subscribe_to "Stuff You Should Know"

    visit root_path
    click_on "My Subscriptions"

    expect(page).to have_css ".podcast h4", text: "Hello Internet"
    expect(page).to have_css ".podcast h4", text: "Stuff You Should Know"
    expect(page).not_to have_css ".podcast h4", text: "Cortex"
  end
end
