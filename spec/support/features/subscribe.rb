module Features
  def subscribe_to(title)
    visit root_path
    find("[data-podcast='#{title}'] a.subscribe").click

    expect(page).to have_css "[data-podcast='#{title}'] a.unsubscribe"
  end
end
