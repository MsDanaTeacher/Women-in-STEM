class CreateWishlists < ActiveRecord::Migration[7.0]
  def change
    create_table :wishlists do |t|
      t.string :book_image
      t.string :purchase

      t.timestamps
    end
  end
end
