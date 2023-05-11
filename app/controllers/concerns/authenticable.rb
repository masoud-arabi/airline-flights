# frozen_string_literal: true

module Authenticable
    def current_user
      return @current_user if @current_user
  
      header = request.headers['Authorization']
      return nil if header.nil?
  
      begin
        decoded = JsonWebToken.decode(header)
        @current_user = User.find(decoded[:user_id])
      rescue ActiveRecord::RecordNotFound, JWT::DecodeError => e
        render json: { error: 'Invalid token' }, status: 401
      end
    end
  
    protected
  
    def check_login
      return if current_user
  
      render json: { error: 'Please login' }, status: :forbidden
    end
  end
  