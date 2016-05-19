module Features
  def sign_in
    visit root_path

    mock_auth_hash
    find(".google-login").click

    expect(page).to have_css ".nav-item", text: "Hi, mockuser"
  end
end
