class RemoveImagePathFromMyCollections < ActiveRecord::Migration[7.0]
  def change
    remove_column :my_collections, :image_path, :string
  end
end
