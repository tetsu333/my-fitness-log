class Api::V1::SessionsController < ApplicationController
  skip_before_action :login_required

  def create
    user = User.find_by(email: session_params[:email])
    if user&.authenticate(session_params[:password])
      # session[:user_id] = user.id
      cookies.encrypted[:user_id] = {
        value: user.id,
        secure: true
      }
      render json: user, status: :ok
    else
      render status: :unauthorized
    end
  end

  def destroy
    reset_session
    @current_user = nil
    render json: {message: "ログアウトしました"}, status: :ok
  end

  private
    def session_params
      params.require(:session).permit(:email, :password)
    end
end
