class LearnsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index 
        collect = MyCollection.find_by(user_id: params[:user_id], woman_id: params[:woman_id])
        all_learns = collect.learns.where(user_id: @current_user.id)
        render json: all_learns
    end

    def show
        render json: Learn.find_by(user_id: @current_user.id, my_collection_id: params[:id], learn: params[:learn])
    end

    def create
        collect = MyCollection.find_by(user_id: params[:user_id], woman_id: params[:woman_id])
        learn = collect.learns.create!(user_id: params[:user_id], learn: params[:learn])
        render json: learn, status: :created
    end

    def destroy
        destroy_learn = Learn.find_by(user_id: @current_user.id, id: params[:learn_id])
        if destroy_learn
            destroy_learn.destroy
        # head :no_content
        render json: destroy_learn
        end
    end

    private
    def record_invalid(invalid) 
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def record_not_found
        render json: {error: "Women not found"}, status: :not_found
    end
end


