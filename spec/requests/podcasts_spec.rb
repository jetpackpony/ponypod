require 'rails_helper'

RSpec.describe "Podcasts", type: :request do
  describe "GET /podcasts" do
    it "returns all podcasts" do
      podcast = create_list :podcast, 3
      get podcasts_path

      expect(response).to have_http_status :success
      expect(response.content_type).to eq 'application/vnd.api+json'
      json = JSON.parse response.body
      expect(json['data'].length).to eq(3)
      expect(json['data'][0]['type']).to eq('podcasts')
    end
  end

  describe "GET /podcasts/1" do
    it "returns a single podcast" do
      podcast = create :podcast
      get podcast_path podcast

      expect(response).to have_http_status :success
      expect(response.content_type).to eq 'application/vnd.api+json'
      json = JSON.parse(response.body)['data']
      expect(json['id']).to eq podcast.id.to_s
      expect(json['attributes']['title']).to eq podcast.title
    end
  end
end
