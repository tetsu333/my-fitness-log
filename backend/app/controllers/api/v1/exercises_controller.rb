class Api::V1::ExercisesController < ApplicationController
  def index
    render json: Exercise.where(user_id: params[:user_id]).order(exercise_type: :asc, name: :asc), status: :ok
  end

  def create
    exercise = Exercise.new(exercise_params)
    if exercise.save
      render json: {message: "id:#{exercise.id} success!"}, status: :ok
    else
      render json: exercise.errors.full_messages, status: :bad_request
    end
  end

  def update
    exercise = Exercise.find(params[:exercise_id])
    exercise.name = params[:name]
    exercise.exercise_type = params[:exercise_type]
    if exercise.save
      render json: {message: "success!"}, status: :ok
    else
      render json: exercise.errors.full_messages, status: :bad_request
    end
  end

  private
    def exercise_params
      params.permit(:user_id, :name, :exercise_type)
    end
end
