class Api::V1::TokensController < ApplicationController
  def login
    @user = User.find_by_email(params[:email])

    if @user&.authenticate(params[:password])
      time = Time.now + 24.hours.to_i
      token = JsonWebToken.encode(user_id: @user.id)
      render json: { token:,
                     email: @user.email,
                     expired_at: time.strftime('%m-%d-%Y %H:%M') }, status: :ok
    else
      render json: { error: 'email or password were wrong, please try again.' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
