module Features
  def sign_in
    sign_in_as "mockuser"
  end

  def sign_in_as(username)
    visit root_path

    create :user, name: username
    mock_auth_hash
    find(".google-login").click

    expect(page).to have_logged_in_user username
  end
end
