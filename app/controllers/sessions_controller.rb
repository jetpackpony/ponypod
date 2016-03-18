class SessionsController < ApplicationController
  def create
    user = User.get_from_omniauth request.env["omniauth.auth"]
    session[:current_user_id] = user.id
    redirect_to root_url, notice: "Logged in as " + user.name
  end

  def failure
    redirect_to root_url, notice: params[:message]
  end

  def destroy
    @_current_user = session[:current_user_id] = nil
    redirect_to root_url, notice: "Logged out"
  end
end
