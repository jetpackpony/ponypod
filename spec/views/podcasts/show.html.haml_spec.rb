require 'rails_helper'

RSpec.describe "podcasts/show", type: :view do
  before(:each) do
    @podcast = assign(:podcast, Podcast.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
