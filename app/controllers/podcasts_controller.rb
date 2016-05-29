class PodcastsController < ApplicationController
  before_action :set_podcast, only: [:show, :edit, :update, :destroy]
  before_action :get_user_podcasts, only: [:index, :show]
  before_action :get_viewed_episodes, only: [:show]

  # GET /podcasts
  # GET /podcasts.json
  def index
    @podcasts = Podcast.search params[:query]
  end

  # GET /podcasts/1
  # GET /podcasts/1.json
  def show
    @sort = params[:sort] == 'old-first' ? 'old-first' : 'new-first'
    @segment = current_user && (params[:segment] == 'unplayed-first') ? 'unplayed-first' : 'all'

    @search_path = podcast_path(@podcast)
    @search_placeholder = 'Search episodes'

    if @segment == "all"
      @episodes = @podcast.search_episodes params[:query], @sort
    end

    if @segment == "unplayed-first"
      @episodes = @podcast.search_episodes_segmented params[:query], @sort, get_viewed_episodes
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_podcast
      @podcast = Podcast.find(params[:id])
    end

    def get_user_podcasts
      @user_podcasts = []
      @user_podcasts = Subscription.get_for_user current_user.id if current_user
    end

    def get_viewed_episodes
      @viewed_episodes = []
      @viewed_episodes = ViewedEpisode.get_for_user_and_podcast current_user.id, @podcast.id if current_user
    end
end
