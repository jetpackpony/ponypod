require "rails_helper"

feature "User can login |" do
  scenario "successfully" do
    sign_in
    expect(page).to have_css ".nav-item", text: "Hi, mockuser"
  end
end
