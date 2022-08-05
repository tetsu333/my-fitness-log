class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: {messages: user.errors.full_messages}, status: :bad_request
    end
  end

  private
    def user_params
      params.permit(:name, :email, :password)
    end
end
