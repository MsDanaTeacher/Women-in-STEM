class CreateWonders < ActiveRecord::Migration[7.0]
  def change
    create_table :wonders do |t|
      t.string :wonder
      t.integer :user_id
      t.integer :my_collection_id

      t.timestamps
    end
  end
end
