class PodcastsController < ApplicationController
  def index
  	@podcasts = Podcast.all
  end

  def show
  	@podcast = Podcast.find_by_id params[:id]
  end
end
