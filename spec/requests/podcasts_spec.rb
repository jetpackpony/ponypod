require 'rails_helper'

RSpec.describe "Podcasts", type: :request do
  describe "GET /podcasts" do
    it "works! (now write some real specs)" do
      get podcasts_path
      expect(response).to have_http_status(200)
    end
  end
end
