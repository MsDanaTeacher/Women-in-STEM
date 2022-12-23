class RemoveDetailsFromMyCollections < ActiveRecord::Migration[7.0]
  def change
    remove_column :my_collections, :details, :string
  end
end
