require 'rails_helper'

feature "List podcasts" do
  scenario "User sees all existing podcasts on a home page" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Stuff You Should Know"

    visit root_path

    expect(page).to have_podcast "Hello Internet"
    expect(page).to have_podcast "Stuff You Should Know"
  end
end
