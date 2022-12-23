class MyCollectionsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index 
        render json: @current_user.women
    end

    def show
        render json: MyCollection.find_by(user_id: @current_user.id, woman_id: params[:id])
    end

    def create
        collect = MyCollection.create!(user_id: @current_user.id, woman_id: params[:woman_id])
        render json: collect, status: :created
    end

    def destroy
        destroy_collection = MyCollection.find_by(user_id: @current_user.id, woman_id: params[:id])
        if destroy_collection
            destroy_collection.destroy
        head :no_content
        end
    end
    
    private
    def record_invalid(invalid) 
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def record_not_found
        render json: {error: "Your collection is not found"}, status: :not_found
    end

    # def collection_params
    #     params.permit(:woman_id, :user_id)
    #   end
end
