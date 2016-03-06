require 'rails_helper'

RSpec.describe "episodes/new", type: :view do
  before(:each) do
    assign(:episode, Episode.new())
  end

  it "renders new episode form" do
    render

    assert_select "form[action=?][method=?]", episodes_path, "post" do
    end
  end
end
