class CreateWomen < ActiveRecord::Migration[7.0]
  def change
    create_table :women do |t|
      t.string :name
      t.string :details
      t.string :website
      t.string :image_path

      t.timestamps
    end
  end
end
