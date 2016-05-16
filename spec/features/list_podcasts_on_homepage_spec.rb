require 'rails_helper'

feature "List podcasts on a home page" do
  scenario "successfully" do
    create :podcast, title: "Hello Internet"
    create :podcast, title: "Stuff You Should Know"

    visit root_path

    expect(page).to have_css ".podcast h4", text: "Hello Internet"
    expect(page).to have_css ".podcast h4", text: "Stuff You Should Know"
  end
end
