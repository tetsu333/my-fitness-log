class Api::V1::ExercisesController < ApplicationController
  def index
    render json: Exercise.where(user_id: params[:user_id]), status: :ok
  end

  def create
    exercise = Exercise.new(exercise_params)
    if exercise.save
      render json: {message: "id:#{exercise.id} success!"}, status: :ok
    else
      render json: exercise.errors.full_messages, status: :bad_request
    end
  end

  private
    def exercise_params
      params.permit(:user_id, :name, :exercise_type)
    end
end
