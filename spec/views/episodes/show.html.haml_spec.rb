require 'rails_helper'

RSpec.describe "episodes/show", type: :view do
  before(:each) do
    @episode = assign(:episode, Episode.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
