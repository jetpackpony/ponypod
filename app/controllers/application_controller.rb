class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def current_user
    @_current_user ||= session[:current_user_id] && User.find_by(id: session[:current_user_id])
  end

  def require_login
    if !current_user
      redirect_to podcasts_path, alert: 'You need to login to subscribe to podcasts'
    end
  end

  helper_method :current_user
end
