class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def log_in!(user)
    user.session_token = SecureRandom.urlsafe_base64
    session[:session_token] = user.session_token
    user.save
  end

  def log_out!
    session[:session_token] = nil
    current_user.session_token = nil
    @current_user = nil
  end

  def current_user
    @current_user ||=
      User.find_by_session_token(session[:session_token])
  end
end
