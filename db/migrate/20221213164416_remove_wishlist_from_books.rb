class RemoveWishlistFromBooks < ActiveRecord::Migration[7.0]
  def change
    remove_column :books, :wishlist, :boolean
  end
end
