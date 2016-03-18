class SubscriptionsController < ApplicationController
  def index
    @podcasts = current_user.podcasts
  end

  def create
    Subscription.create podcast_id: params[:id], user_id: current_user.id
    redirect_to podcasts_path, notice: 'Subscribed to a podcast'
  end

  def destroy
    Subscription.find_by(podcast_id: params[:id], user_id: current_user.id).destroy
    redirect_to subscriptions_path
  end
end
