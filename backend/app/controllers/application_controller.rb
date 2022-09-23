class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::Helpers
  include ActionController::RequestForgeryProtection
  
  helper_method :current_user, :user_signed_in?
  before_action :set_csrf_token_header
  before_action :login_required

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def user_signed_in?
    current_user != nil
  end

  def login_required
    render json: {message: "認証エラー"}, status: :unauthorized unless current_user
  end

  def set_csrf_token_header
    response.set_header('X-CSRF-Token', form_authenticity_token)
  end
end
