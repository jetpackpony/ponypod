require 'rails_helper'

RSpec.describe "podcasts/edit", type: :view do
  before(:each) do
    @podcast = assign(:podcast, Podcast.create!())
  end

  it "renders the edit podcast form" do
    render

    assert_select "form[action=?][method=?]", podcast_path(@podcast), "post" do
    end
  end
end
