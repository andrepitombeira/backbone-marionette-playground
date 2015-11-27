class UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      render json: { entity: user }
    else
      render json: { entity: user, errors: user.errors_json }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:login, :password, :password_confirmation)
  end
end
