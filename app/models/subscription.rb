class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :podcast

  def self.subscribe(podcast_id, user_id)
    ids = { podcast_id: podcast_id, user_id: user_id }
    Subscription.find_by(ids) || Subscription.create(ids)
  end

  def self.get_for_user(user_id)
    Subscription
      .where(user_id: user_id)
      .select(:podcast_id)
      .map do |item| item[:podcast_id]; end
  end
end
