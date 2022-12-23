class RemovePurchaseFromWishlists < ActiveRecord::Migration[7.0]
  def change
    remove_column :wishlists, :purchase, :string
  end
end
