module Features
  def subscribe_to(title)
    visit root_path
    click_subscribe title

    expect(page).to have_user_subscribed_to title
  end
end
