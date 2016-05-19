require "rails_helper"

feature "User can login |" do
  scenario "successfully" do
    sign_in_as "testme"
    expect(page).to have_logged_in_user "testme"
  end
end
