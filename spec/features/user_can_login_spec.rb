require "rails_helper"

feature "User can login |" do
  scenario "successfully" do
    sign_in_as "testme"
    expect(page).to have_logged_in_user "testme"
  end

  scenario "unsuccessfully" do
    sign_in_with_invalid_credentials

    expect(page).to have_error_message "invalid_credentials"
  end

  scenario "logout" do
    sign_in_as "testme"
    logout_button.click

    expect(page).to have_login_button
  end

  scenario "new user loging" do
    sign_up_as "testme"
    expect(page).to have_logged_in_user "testme"
  end
end
