class EpisodesController < ApplicationController
  before_action :set_episode, only: [:show]

  # GET /episodes
  def index
    @episodes = Episode.all

    render json: @episodes
  end

  # GET /episodes/1
  def show
    render json: @episode
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_episode
      @episode = Episode.find(params[:id])
    end
end
