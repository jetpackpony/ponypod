require "rails_helper"

RSpec.describe PodcastsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/podcasts").to route_to("podcasts#index")
    end

    it "routes to #show" do
      expect(:get => "/podcasts/1").to route_to("podcasts#show", :id => "1")
    end

  end
end
