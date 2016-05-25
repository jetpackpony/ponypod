module Features
  def sign_in
    sign_in_as "mockuser"
  end

  def sign_in_as(username)
    visit root_path

    if page.has_css? login_button_css
      create :user, name: username
      mock_auth_hash
      login_button.click
    end

    expect(page).to have_logged_in_user username
  end

  def sign_up_as(username)
    visit root_path

    mock_auth_hash username
    login_button.click

    expect(page).to have_logged_in_user username
  end

  def sign_in_with_invalid_credentials
    mock_invalid_credentials
    silence_omniauth do
      visit root_path
      login_button.click
    end
  end
end
