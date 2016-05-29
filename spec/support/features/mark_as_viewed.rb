module Features
  def mark_episode_as_viewed(episode)
    sign_in
    visit episode_path episode
    click_on "Mark as viewed"
    expect(page).to display_viewed_episode episode.title
  end
end
