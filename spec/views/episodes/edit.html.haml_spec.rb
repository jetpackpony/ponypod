require 'rails_helper'

RSpec.describe "episodes/edit", type: :view do
  before(:each) do
    @episode = assign(:episode, Episode.create!())
  end

  it "renders the edit episode form" do
    render

    assert_select "form[action=?][method=?]", episode_path(@episode), "post" do
    end
  end
end
