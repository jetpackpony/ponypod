class PodcastsController < ApplicationController
  before_action :set_podcast, only: [:show]

  # GET /podcasts
  def index
    @podcasts = Podcast.all
    render json: @podcasts
  end

  # GET /podcasts/1
  def show
    render json: @podcast
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_podcast
      @podcast = Podcast.find(params[:id])
    end
end
