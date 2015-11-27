class AuthenticationController < ApplicationController
  def sign_in
    user = User.find_by(login: params[:login])

    if user && user.authenticate(params[:password])
      render json: { entity: user.generated_credentials }
    else
      render json: { errors: ['Login or password is incorrect'] }, status: :unprocessable_entity
    end
  end

  def validate
    if current_user
      render json: {}
    else
      render json: { errors: ['Token is invalid'] }, status: :unprocessable_entity
    end
  end

  def destroy
    current_user && current_user.destroy_token

    render json: {}
  end
end
