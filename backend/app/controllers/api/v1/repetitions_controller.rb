class Api::V1::RepetitionsController < ApplicationController
  def index
    repetitions = Repetition.where(user_id: params[:user_id], exercise_date: params[:exercise_date]).order(exercise_id: :ASC, created_at: :ASC)
    data = repetitions.map do |repetition|
      {
        id: repetition.id,
        exercise_name: repetition.exercise.name,
        repetition_num: repetition.repetition_num,
        weight: repetition.weight,
        exercise_type: I18n.t(repetition.exercise.exercise_type, scope: "enums.exercise.exercise_type")
      }
    end
    render json: data, status: :ok
  end

  def new
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

  def destroy
    repetition = Repetition.find_by(id: params[:id])
    if repetition.destroy
      render json: {message: "id:#{repetition.id} success!"}, status: :ok
    end
  end

  private
    def repetition_params
      params.permit(:user_id, :exercise_id, :repetition_num, :weight, :exercise_date)
    end
end
