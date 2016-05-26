require "rails_helper"

describe Podcast do
  describe "#syncronize" do
    let(:existing_episode_title) { "H.I. #61: Edisson and Queen Nefertiti" }
    let(:existing_episode_guid) { "52d66949e4b0a8cec3bcdd46:52d67282e4b0cca8969714fa:5717d00520c6470ae10b9a2f" }

    subject do
      podcast = create :podcast, rss_link: "http://www.hellointernet.fm/podcast?format=rss"
      create :episode, title: existing_episode_title, guid: existing_episode_guid, podcast: podcast
      podcast.syncronize
    end

    it "updates a podcast model with the data from it's rss feed" do
      is_expected.to have_attributes title: "Hello Internet"
      is_expected.to have_attributes description: "Hello Internet Description"
      is_expected.to have_attributes image: "http://image.com/image.png"
    end

    it "creates new episodes with the data from the rss feed" do
      expect(subject.episodes.map(&:title)).to include "H.I. #62: Cheer Pressure"
      expect(subject.episodes.map(&:title)).to include "H.I. #63: One in Five Thousand"
    end

    it "updates existing episodes with the data from the rss feed" do
      expect(subject.episodes.map(&:title)).to include "H.I. #61: Tesla and King Tut"
      expect(subject.episodes.map(&:title)).not_to include existing_episode_title
    end

    it "properly parses all the fields of the episode"
  end

  describe ".sync" do
    it "calls syncronize on each existing podcast"
  end
end
