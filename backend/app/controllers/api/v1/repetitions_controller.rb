class Api::V1::RepetitionsController < ApplicationController
  def index
    render json: Repetition.where(user_id: params[:user_id], exercise_id: params[:exercise_id]).order(exercise_date: :DESC, created_at: :DESC).limit(30), status: :ok
  end

  def create
    repetition = Repetition.new(repetition_params)
    if repetition.save
      render json: {message: "id:#{repetition.id} success!"}, status: :ok
    else
      render json: repetition.errors.full_messages, status: :bad_request
    end
  end

  private
    def repetition_params
      params.permit(:user_id, :exercise_id, :repetition_num, :weight, :exercise_date)
    end
end
