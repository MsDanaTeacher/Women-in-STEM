class RemoveWebsiteFromMyCollections < ActiveRecord::Migration[7.0]
  def change
    remove_column :my_collections, :website, :string
  end
end
