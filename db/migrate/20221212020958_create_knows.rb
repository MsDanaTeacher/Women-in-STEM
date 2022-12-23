class CreateKnows < ActiveRecord::Migration[7.0]
  def change
    create_table :knows do |t|
      t.string :know
      t.integer :user_id
      t.integer :my_collection_id
      t.timestamps
    end
  end
end
