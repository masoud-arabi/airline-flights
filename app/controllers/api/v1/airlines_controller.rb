class Api::V1::AirlinesController < ApplicationController
  include Paginable
  before_action :find_airline, only: [:show, :update, :destroy]
  
  def show
    @airline = Airline.find_by(slug: params[:slug])
    render json: AirlineSerializer.new(@airline, options).serializable_hash
  end

  def index
    @airlines = Airline.page(current_page).per(per_page)
    options = get_links_serializer_options('api_v1_airlines_path', @airlines)
    render json: AirlineSerializer.new(@airlines, options).serializable_hash
  end
  
  def create
    @airline = Airline.new(airline_params)
    if @airline.save
      render json: AirlineSerializer.new(@airline).serializable_hash
    else 
      render json: @airline.errors, status: :unprocessable_entity
    end
  end
  
  def update
    if @airline.update(airline_params)
      render json: AirlineSerializer.new(@airline, options).serializable_hash
    else
      render json: @airline.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    if @airline.destroy
      head :no_content
    else
      render json: @airline.errors, status: :unprocessable_entity
    end
  end
  

  private

  def find_airline
    @airline = Airline.find_by(slug: params[:slug])
  end

  def airline_params 
    params.require(:airline).permit(:image_url, :name)
  end

  def options 
    @options ||= {include: %i[reviews]}
  end
end
