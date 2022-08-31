class Api::V1::HomesController < ApplicationController
  def index
    render json: Repetition.where(user_id: params[:user_id]).order(exercise_date: :DESC).pluck(:exercise_date).uniq, status: :ok
  end
end
