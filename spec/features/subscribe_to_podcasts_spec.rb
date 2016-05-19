require "rails_helper"

feature "Subscribe to podcasts |" do
  scenario "Subscribe from home page" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Cortex"

    sign_in
    subscribe_to "Hello Internet"

    expect(page).to have_user_subscribed_to "Hello Internet"
    expect(page).not_to have_user_subscribed_to "Cortex"
  end

  scenario "Subscribe from a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"

    sign_in
    visit podcast_path hi_podcast
    click_subscribe

    expect(page).to have_user_subscribed_to "Hello Internet"
  end

  scenario "Subscribe from an episode page" do 
    hi_podcast = create :podcast, title: "Hello Internet"
    episode = create :episode, podcast: hi_podcast

    sign_in
    visit episode_path episode
    click_subscribe

    expect(page).to have_user_subscribed_to "Hello Internet"
  end

  scenario "Unsubscribe from home page" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Cortex"
    
    sign_in
    subscribe_to "Hello Internet"
    subscribe_to "Cortex"

    visit root_path
    click_unsubscribe "Hello Internet"

    expect(page).not_to have_user_subscribed_to "Hello Internet"
    expect(page).to have_user_subscribed_to "Cortex"
  end

  scenario "Unsubscribe from a podcast page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    
    sign_in
    subscribe_to "Hello Internet"

    visit podcast_path hi_podcast
    click_unsubscribe

    expect(page).not_to have_user_subscribed_to "Hello Internet"
  end

  scenario "Unsubscribe from an episode page" do
    hi_podcast = create :podcast, title: "Hello Internet"
    episode = create :episode, podcast: hi_podcast

    sign_in
    subscribe_to "Hello Internet"

    visit episode_path episode
    click_unsubscribe

    expect(page).not_to have_user_subscribed_to "Hello Internet"
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

    expect(page).to have_podcast "Hello Internet"
    expect(page).to have_podcast "Stuff You Should Know"
    expect(page).not_to have_podcast "Cortex"
  end
end
