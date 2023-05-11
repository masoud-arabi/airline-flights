class  Api::V1::ReviewsController < ApplicationController
  # protect_from_forgery with: :null_session
  before_action :check_login, only: %i[update destroy]

  
  def create
    @review = airline.reviews.new(review_params)
    if @review.save 
      render json: ReviewSerializer.new(@review).serializable_hash
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def update 
    @review = Review.find(params[:id])
    if @review.update(review_params) 
      render json: ReviewSerializer.new(@review).serializable_hash
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @review = Review.find(params[:id])
    if @review.destroy 
      head :no_content
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  private

  def airline
    @airline ||= Airline.find(params[:airline_id]) 
  end

  def review_params 
    params.require(:review).permit(:score, :title, :description, :airline_id)
  end
end
