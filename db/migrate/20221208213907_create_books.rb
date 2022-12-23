class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :book_image
      t.string :purchase
      t.boolean :wishlist

      t.timestamps
    end
  end
end
