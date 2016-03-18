class User < ActiveRecord::Base
  has_many :subscriptions
  has_many :podcasts, through: :subscriptions

  def self.get_from_omniauth(auth)
    find_by_provider_and_uid(auth[:provider], auth[:uid]) || create_with_omniauth(auth)
  end

  def self.create_with_omniauth(auth)
    create(
      provider: auth[:provider],
      uid: auth[:uid],
      name: auth[:info][:name]
    )
  end
end
