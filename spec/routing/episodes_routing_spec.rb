require "rails_helper"

RSpec.describe EpisodesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/podcasts/1/episodes").to route_to("episodes#index", :podcast_id => "1")
    end

    it "routes to #show" do
      expect(:get => "/episodes/1").to route_to("episodes#show", :id => "1")
    end

  end
end
