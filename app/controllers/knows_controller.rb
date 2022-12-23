class KnowsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index 
        collect = MyCollection.find_by(user_id: params[:user_id], woman_id: params[:woman_id])
        all_knows = collect.knows.where(user_id: @current_user.id)
        render json: all_knows
    end

    def show
        render json: Know.find_by(user_id: @current_user.id, my_collection_id: params[:id], know: params[:know])
    end

    def create
        collect = MyCollection.find_by(user_id: params[:user_id], woman_id: params[:woman_id])
        know = collect.knows.create!(user_id: params[:user_id], know: params[:know])
        render json: know, status: :created
    end

    def destroy
        destroy_know = Know.find_by(user_id: @current_user.id, id: params[:know_id])
        if destroy_know
            destroy_know.destroy
        # head :no_content
        render json: destroy_know
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
