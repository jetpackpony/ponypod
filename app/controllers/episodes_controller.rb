class EpisodesController < ApplicationController
  before_action :set_episode, only: [:show, :edit, :update, :destroy, :viewed_status]
  before_action :require_login, only: [:viewed_status]
  before_action :set_is_viewed, only: [:show]
  before_action :set_is_subscribed, only: [:show]

  # GET /episodes/1
  # GET /episodes/1.json
  def show
  end

  # POST /episodes/1/viewed_status
  def viewed_status
    if viewed_param == 'viewed'
      @episode.mark_viewed_by current_user.id
    else
      @episode.mark_new_by current_user.id
    end
    redirect_to :back, notice: 'Episode marked as ' + viewed_param
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_episode
      @episode = Episode.find(params[:id])
    end

    def viewed_param
      case params[:status]
      when 'viewed'
        'viewed'
      when 'new'
        'new'
      end
    end

    def set_is_viewed
      @episode_is_viewed = false
      @episode_is_viewed = @episode.is_viewed_by current_user.id if current_user
    end

    def set_is_subscribed
      @podcast_is_subscribed = false
      @podcast_is_subscribed = Subscription.get_for_user(current_user.id).include? @episode.podcast_id if current_user
    end
end
