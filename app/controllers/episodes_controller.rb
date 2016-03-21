class EpisodesController < ApplicationController
  before_action :set_episode, only: [:show, :edit, :update, :destroy, :viewed_status]
  before_action :require_login, only: [:viewed_status]
  before_action :set_is_viewed, only: [:show]

  # GET /episodes
  # GET /episodes.json
  def index
    @episodes = Episode.all
  end

  # GET /episodes/1
  # GET /episodes/1.json
  def show
  end

  # GET /episodes/new
  def new
    @episode = Episode.new
  end

  # GET /episodes/1/edit
  def edit
  end

  # POST /episodes
  # POST /episodes.json
  def create
    @episode = Episode.new(episode_params)

    respond_to do |format|
      if @episode.save
        format.html { redirect_to @episode, notice: 'Episode was successfully created.' }
        format.json { render :show, status: :created, location: @episode }
      else
        format.html { render :new }
        format.json { render json: @episode.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /episodes/1
  # PATCH/PUT /episodes/1.json
  def update
    respond_to do |format|
      if @episode.update(episode_params)
        format.html { redirect_to @episode, notice: 'Episode was successfully updated.' }
        format.json { render :show, status: :ok, location: @episode }
      else
        format.html { render :edit }
        format.json { render json: @episode.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /episodes/1
  # DELETE /episodes/1.json
  def destroy
    @episode.destroy
    respond_to do |format|
      format.html { redirect_to episodes_url, notice: 'Episode was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # POST /episodes/1/viewed_status
  def viewed_status
    if viewed_param == 'viewed'
      @episode.mark_viewed_by current_user.id
    else
      @episode.mark_new_by current_user.id
    end
    redirect_to :back, notice: 'Episode marked as ' + viewed_param
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_episode
      @episode = Episode.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def episode_params
      params[:episode]
    end

    def viewed_param
      case params[:status]
      when 'viewed'
        'viewed'
      when 'new'
        'new'
      else
        raise "Wrong argument format of viewed_status: " + params[:viewed_status]
      end
    end

    def set_is_viewed
      @episode_is_viewed = false
      @episode_is_viewed = @episode.is_viewed_by current_user.id if current_user
    end
end
