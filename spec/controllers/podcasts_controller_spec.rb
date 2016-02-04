require 'rails_helper'

RSpec.describe PodcastsController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
		it 'assigns @podcasts' do
			podcast = Podcast.create
			get :index
			expect(assigns(:podcasts)).to eq([podcast])
		end
		it 'renders the index template' do
			get :index
			expect(response).to render_template("index")
		end
  end

  describe "GET #show" do
    before(:each) do
			@podcast = Podcast.create
    end
    it "returns http success" do
      get :show, :id => @podcast.id
      expect(response).to have_http_status(:success)
    end
		it 'renders the show template' do
      get :show, :id => @podcast.id
			expect(response).to render_template("show")
		end
		it 'assigns @podcast' do
      get :show, :id => @podcast.id
			expect(assigns(:podcast)).to eq(@podcast)
		end
	end
end
