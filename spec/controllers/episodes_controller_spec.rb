require 'rails_helper'

RSpec.describe EpisodesController, type: :controller do
  describe "GET #show" do
    before(:each) do
      @episode = Episode.create
    end
    it "returns http success" do
      get :show, :id => @episode.id
      expect(response).to have_http_status(:success)
    end
    it 'renders the show template' do
      get :show, :id => @episode.id
      expect(response).to render_template("show")
    end
    it 'assigns @episode' do
      get :show, :id => @episode.id
      expect(assigns(:episode)).to eq(@episode)
    end
  end
end
