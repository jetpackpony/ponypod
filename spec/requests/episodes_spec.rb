require 'rails_helper'

RSpec.describe "Episodes", type: :request do
  describe "GET /podcasts/1/episodes" do
    it "returns all episodes of the podcast" do
      podcast = create :podcast
      episode = create_list :episode, 4, podcast: podcast
      get podcast_episodes_path podcast

      expect(response).to have_http_status :success
      expect(response.content_type).to eq 'application/vnd.api+json'
      json = JSON.parse response.body
      expect(json['data'].length).to eq 4
      expect(json['data'][0]['type']).to eq 'episodes'
      expect(json['data'][0]['attributes']['podcast-id']).to eq podcast.id
    end
  end

  describe "GET /episode/1" do
    it "returns a single episode" do
      episode = create :episode
      get episode_path episode

      expect(response).to have_http_status :success
      expect(response.content_type).to eq 'application/vnd.api+json'
      json = JSON.parse(response.body)['data']
      expect(json['id']).to eq episode.id.to_s
      expect(json['attributes']['title']).to eq episode.title
    end
  end
end
