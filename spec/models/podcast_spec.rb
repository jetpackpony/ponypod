require "rails_helper"

describe Podcast do
  describe "#syncronize" do
    let(:existing_episode_title) { "H.I. #61: Edisson and Queen Nefertiti" }
    let(:existing_episode_guid) { "52d66949e4b0a8cec3bcdd46:52d67282e4b0cca8969714fa:5717d00520c6470ae10b9a2f" }
    let(:episodes_list) { subject.episodes.map(&:title) }

    subject do
      podcast = create :podcast, rss_link: "http://www.hellointernet.fm/podcast?format=rss"
      create :episode, title: existing_episode_title, guid: existing_episode_guid, podcast: podcast
      podcast.syncronize
    end

    let(:existing_episode) { Episode.find_by guid: existing_episode_guid }

    it "updates a podcast model with the data from it's rss feed" do
      is_expected.to have_attributes title: "Hello Internet"
      is_expected.to have_attributes description: "Hello Internet Description"
      is_expected.to have_attributes image: "http://image.com/image.png"
    end

    it "creates new episodes with the data from the rss feed" do
      expect(episodes_list).to include "H.I. #62: Cheer Pressure"
      expect(episodes_list).to include "H.I. #63: One in Five Thousand"
    end

    it "updates existing episodes with the data from the rss feed" do
      expect(episodes_list).to include "H.I. #61: Tesla and King Tut"
      expect(episodes_list).not_to include existing_episode_title
    end

    it "properly parses all the fields of the episode" do
      subject
      expect(existing_episode).to have_attributes title: "H.I. #61: Tesla and King Tut"
      expect(existing_episode).to have_attributes mp3_link: "http://traffic.libsyn.com/hellointernet/61.mp3"
      expect(existing_episode).to have_attributes full_description: "<p>Grey and Brady discuss</p><h2>Brought to You By</h2>"
      expect(existing_episode).to have_attributes summary: "Grey and Brady discuss"
      expect(existing_episode).to have_attributes published_at: DateTime.parse("Wed, 20 Apr 2016 18:59:23 +0000")
    end
  end

  describe ".sync" do
    it "calls syncronize on each existing podcast" do
      sync_calls = 0
      allow_any_instance_of(Podcast).to receive(:syncronize) do 
        sync_calls += 1
      end
      create :podcast
      create :podcast
      create :podcast

      Podcast.sync

      expect(sync_calls).to eq 3
    end
  end
end
