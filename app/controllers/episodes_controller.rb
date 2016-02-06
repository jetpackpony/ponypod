class EpisodesController < ApplicationController
  def show
    @episode = Episode.find_by_id params[:id]
  end
end
