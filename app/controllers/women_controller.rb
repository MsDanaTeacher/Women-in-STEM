class WomenController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
        render json: Woman.all
    end

    def show
        woman = Woman.find(params[:id])
        render json: woman
    end
    
    private
    def record_invalid(invalid) 
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def record_not_found
        render json: {error: "Women not found"}, status: :not_found
    end
end
