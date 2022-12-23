class WondersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index 
        collect = MyCollection.find_by(user_id: params[:user_id], woman_id: params[:woman_id])
        all_wonders = collect.wonders.where(user_id: @current_user.id)
        render json: all_wonders
    end

    def show
        render json: Wonder.find_by(user_id: @current_user.id, my_collection_id: params[:id], wonder: params[:wonder])
    end

    def create
        collect = MyCollection.find_by(user_id: params[:user_id], woman_id: params[:woman_id])
        wonder = collect.wonders.create!(user_id: params[:user_id], wonder: params[:wonder])
        render json: wonder, status: :created
    end

    def destroy
        destroy_wonder = Wonder.find_by(user_id: @current_user.id, id: params[:wonder_id])
        if destroy_wonder
            destroy_wonder.destroy
            render json: destroy_wonder
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
