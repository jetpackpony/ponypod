require 'rails_helper'

RSpec.describe PagesController, type: :controller do

  describe "GET #home" do
    it "returns http success" do
      get :home
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #podcast" do
    it "returns http success" do
      get :podcast
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #episode" do
    it "returns http success" do
      get :episode
      expect(response).to have_http_status(:success)
    end
  end

end
