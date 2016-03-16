class SessionsController < ApplicationController
  def create
    user = User.get_from_omniauth request.env["omniauth.auth"]
    session[:user_id] = user.id
    redirect_to root_url, notice: "Logged in as " + user.name
  end

  def failure
    redirect_to root_url, notice: params[:message]
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_url, notice: "Logged out"
  end
end
