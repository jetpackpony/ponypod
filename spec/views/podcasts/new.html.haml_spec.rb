require 'rails_helper'

RSpec.describe "podcasts/new", type: :view do
  before(:each) do
    assign(:podcast, Podcast.new())
  end

  it "renders new podcast form" do
    render

    assert_select "form[action=?][method=?]", podcasts_path, "post" do
    end
  end
end
