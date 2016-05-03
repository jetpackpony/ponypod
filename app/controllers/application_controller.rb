class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :setup_search

  private

  def current_user
    @_current_user ||= session[:current_user_id] && User.find_by(id: session[:current_user_id])
  end

  def require_login
    if !current_user
      redirect_to podcasts_path, alert: 'You need to login to subscribe to podcasts'
    end
  end

  def setup_search
    @search_path = podcasts_path
    @search_placeholder = "Search podcasts"
  end

  helper_method :current_user
end
