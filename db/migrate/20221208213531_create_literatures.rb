class CreateLiteratures < ActiveRecord::Migration[7.0]
  def change
    create_table :literatures do |t|
      t.string :book_image
      t.string :purchase
      t.boolean :wishlist

      t.timestamps
    end
  end
end
