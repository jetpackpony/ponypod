class SubscriptionsController < ApplicationController
  before_action :require_login

  def index
    @podcasts = current_user.podcasts
    @user_podcasts = @podcasts.map do |item| item[:id]; end
    render 'podcasts/index'
  end

  def create
    Subscription.subscribe params[:id], current_user.id
    redirect_to :back, notice: 'Subscribed to a podcast'
  end

  def destroy
    Subscription.find_by(podcast_id: params[:id], user_id: current_user.id).destroy
    redirect_to :back, notice: 'Unsubscribed from a podcast'
  end
end
