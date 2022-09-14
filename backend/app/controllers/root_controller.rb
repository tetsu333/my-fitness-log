class RootsController < ApplicationController
  skip_before_action :login_required

  def index
    render json: {message: "MyFitnessLog"}, status: :ok
  end
end
