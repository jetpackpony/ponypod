require 'rails_helper'

RSpec.describe "episodes/index", type: :view do
  before(:each) do
    assign(:episodes, [
      Episode.create!(),
      Episode.create!()
    ])
  end

  it "renders a list of episodes" do
    render
  end
end
