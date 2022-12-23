class RemoveBookImageFromWishlists < ActiveRecord::Migration[7.0]
  def change
    remove_column :wishlists, :book_image, :string
  end
end
