class  Api::V1::ReviewsController < ApplicationController

  
  def create
    @review = Review.new(review_params)
    if @review.save 
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

  def review_params 
    params.require(:review).permit(:score, :title, :description, :airline_id)
  end
end
