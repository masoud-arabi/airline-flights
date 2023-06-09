class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  
   def index
        @users = User.all
        render json: UserSerializer.new(@users).serializable_hash
    end

    def show 
        render json: UserSerializer.new(@user).serializable_hash 
    end

  def create
    @user = User.create(user_params)
    if @user.save 
      render json: UserSerializer.new(@user).serializable_hash, status: :created
    else
        render json: @user.errors, status: :unprocessable_entity 
    end
  end

  def update
    if @user.update(user_params)
      render json: UserSerializer.new(@user).serializable_hash, status: :ok
    else
        render json: @user.errors, status: :unprocessable_entity 
    end
  end

  def destroy
    @user.destroy 
    head 204
  end

  private

  def user_params 
    params.require(:user).permit(:email, :password)
  end

  def set_user 
    @user = User.find(params[:id])
  end
end
