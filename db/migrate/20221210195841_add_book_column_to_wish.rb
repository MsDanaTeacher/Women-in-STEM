class AddBookColumnToWish < ActiveRecord::Migration[7.0]
  def change
    add_column :wishlists, :user_id, :integer
    add_column :wishlists, :book_id, :integer
  end
end
