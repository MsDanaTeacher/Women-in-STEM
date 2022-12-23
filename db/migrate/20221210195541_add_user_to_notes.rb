class AddUserToNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :notes, :user_id, :integer
    add_column :notes, :my_collection_id, :integer
  end
end
