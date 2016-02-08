require 'rails_helper'

RSpec.describe "podcasts/index", type: :view do
  before(:each) do
    assign(:podcasts, [
      Podcast.create!(),
      Podcast.create!()
    ])
  end

  it "renders a list of podcasts" do
    render
  end
end
