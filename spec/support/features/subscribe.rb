module Features
  def subscribe_to(title)
    visit root_path
    click_subscribe title
  end
end
