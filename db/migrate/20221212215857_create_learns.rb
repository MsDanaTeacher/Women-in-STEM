class CreateLearns < ActiveRecord::Migration[7.0]
  def change
    create_table :learns do |t|
      t.string :learn
      t.integer :user_id
      t.integer :my_collection_id

      t.timestamps
    end
  end
end
