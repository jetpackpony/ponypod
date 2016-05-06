class PodcastsController < ApplicationController
  before_action :set_podcast, only: [:show, :edit, :update, :destroy]
  before_action :get_user_podcasts, only: [:index, :show]
  before_action :get_viewed_episodes, only: [:show]

  # GET /podcasts
  # GET /podcasts.json
  def index
    @podcasts = Podcast.search params[:query]
  end

  # GET /podcasts/1
  # GET /podcasts/1.json
  def show
    @search_path = podcast_path(@podcast)
    @search_placeholder = 'Search episodes'

    @sort = params[:sort] == 'old-first' ? 'old-first' : 'new-first'
    @segment = current_user && (params[:segment] == 'unplayed-first') ? 'unplayed-first' : 'all'

    if @segment == "all"
      @episodes = @podcast.search_episodes params[:query], @sort
    end

    if @segment == "unplayed-first"
      @episodes = @podcast.search_episodes_segmented params[:query], @sort, get_viewed_episodes
    end
  end

  # GET /podcasts/new
  def new
    @podcast = Podcast.new
  end

  # GET /podcasts/1/edit
  def edit
  end

  # POST /podcasts
  # POST /podcasts.json
  def create
    @podcast = Podcast.new(podcast_params)

    respond_to do |format|
      if @podcast.save
        format.html { redirect_to @podcast, notice: 'Podcast was successfully created.' }
        format.json { render :show, status: :created, location: @podcast }
      else
        format.html { render :new }
        format.json { render json: @podcast.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /podcasts/1
  # PATCH/PUT /podcasts/1.json
  def update
    respond_to do |format|
      if @podcast.update(podcast_params)
        format.html { redirect_to @podcast, notice: 'Podcast was successfully updated.' }
        format.json { render :show, status: :ok, location: @podcast }
      else
        format.html { render :edit }
        format.json { render json: @podcast.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /podcasts/1
  # DELETE /podcasts/1.json
  def destroy
    @podcast.destroy
    respond_to do |format|
      format.html { redirect_to podcasts_url, notice: 'Podcast was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_podcast
      @podcast = Podcast.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def podcast_params
      params.require(:podcast).permit(:title, :rss_link)
      # params[:podcast]
    end

    def get_user_podcasts
      @user_podcasts = []
      @user_podcasts = Subscription.get_for_user current_user.id if current_user
    end

    def get_viewed_episodes
      @viewed_episodes = []
      @viewed_episodes = ViewedEpisode.get_for_user_and_podcast current_user.id, @podcast.id if current_user
    end
end
