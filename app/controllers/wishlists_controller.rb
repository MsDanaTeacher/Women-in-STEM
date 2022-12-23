class WishlistsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
        render json: @current_user.wishlists
    end

    def show
        wishlist = Wishlist.find_by(user_id: @current_user.id, book_id: params[:id])
        render json: wishlist, status: :created
    end

    def create
        wish = Wishlist.create!(user_id: @current_user.id, book_id: params[:book_id])
        render json: wish, status: :created
    end

    def destroy
        destroy_wishlist = Wishlist.find_by(user_id: @current_user.id, book_id: params[:id])
        if destroy_wishlist
            destroy_wishlist.destroy
            head :no_content
        end
    end
    
    private
    def record_invalid(invalid) 
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def record_not_found
        render json: {error: "Wishlist not found"}, status: :not_found
    end
end
