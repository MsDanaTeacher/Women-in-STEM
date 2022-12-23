class AddMyCollectionColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :my_collections, :woman_id, :integer
    add_column :my_collections, :user_id, :integer
  end
end
