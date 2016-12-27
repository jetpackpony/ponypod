class Podcast < ApplicationRecord
  has_many :episodes, dependent: :destroy
end
