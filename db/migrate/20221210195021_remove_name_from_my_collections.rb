class RemoveNameFromMyCollections < ActiveRecord::Migration[7.0]
  def change
    remove_column :my_collections, :name, :string
  end
end
