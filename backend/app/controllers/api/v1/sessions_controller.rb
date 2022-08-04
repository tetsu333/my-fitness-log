class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: session_params[:email])
    if user&.authenticate(session_params[:password])
      session[:user_id] = user.id
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
