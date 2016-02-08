require "rails_helper"

RSpec.describe PodcastsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/podcasts").to route_to("podcasts#index")
    end

    it "routes to #new" do
      expect(:get => "/podcasts/new").to route_to("podcasts#new")
    end

    it "routes to #show" do
      expect(:get => "/podcasts/1").to route_to("podcasts#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/podcasts/1/edit").to route_to("podcasts#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/podcasts").to route_to("podcasts#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/podcasts/1").to route_to("podcasts#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/podcasts/1").to route_to("podcasts#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/podcasts/1").to route_to("podcasts#destroy", :id => "1")
    end

  end
end
